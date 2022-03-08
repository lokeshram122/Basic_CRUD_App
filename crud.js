const {MongoClient, ObjectId} = require('mongodb');
require('dotenv').config({path:__dirname+'\\.env'})
const uri = process.env['MongoDBURI'];
const client = new MongoClient(uri);
const _ = require('lodash');
const dot = require('mongo-dot-notation');

/**
 * This method is to get the list of users
 */
async function pageload(req,res)
{
    await client.connect();
    var results = await getusers(client)
    res.send(results)
}

async function getusers(client)
{
    try
    {
       var result =  await client.db('crud').collection('users').find();
       return await result.toArray();
    } 
    catch (error) 
    {
        return error.message;
    }
}

/**
 * This method is to update a user passing the userid and the updated details
 */
async function update(req,res)
{
    let Message ="";
    if(typeof req.body == "undefined" || typeof req.params.id == "undefined")
    {
        Message="details not provided"
    }
    else
    {
        await client.connect();
        Message=await updateuser(client,req.params.id,dot.flatten(req.body))
    }
   
    res.send(Message)
}

async function updateuser(client,userID,userInfo)
{
    let Message="";
    try 
    {
       var result =  await client.db('crud').collection('users').updateOne({_id:ObjectId(userID)},userInfo)
       Message="User Updated"
    } 
    catch (error) 
    {
        Message=error
    }
    finally
    {
        return Message;
    }
}

/**
 * This method is to delete a user passing the userid
 */
async function deleteusers(req,res)
{

    let Message ="";
    if(typeof req.params.id == "undefined")
    {
        Message="details not provided"
    }
    else
    {
        await client.connect();
        Message=await deleteuser(client,req.params.id)
    }
   
    res.send(Message)
}

async function deleteuser(client,userID)
{
    let Message="";
    try 
    {
       var result =  await client.db('crud').collection('users').deleteOne({_id:ObjectId(userID)})
       Message="User Deleted"
    } 
    catch (error) 
    {
        Message=error
    }
    finally
    {
        return Message;
    }
}


/**
 * This method is to insert a user passing the user details
 */
async function register(req,res)
{

    let Message ="";
    if(typeof req.body == "undefined")
    {
        Message="details not provided"
    }
    else
    {
        await client.connect();
        Message=await insertuser(client,req.body)
    }
   
    res.send(Message)
}

async function insertuser(client,user)
{
    let Message="";
    try 
    {
       var result = await client.db('crud').collection('users').insertOne(user);
       Message="User Inserted"+result.insertedId
    } 
    catch (error) 
    {
        Message=error
    }
    finally
    {
        return Message;
    }
}

//#region unusedcodes
async function insertusers(client,users)
{
    try {
        
     var result = await client.db('crud').collection('users').insertMany(users);
     console.log(result.insertedCount +" - "+ JSON.stringify(result.insertedIds));
    } catch (error) {
        console.error(error);
    }
}


async function getfilteredusers(client,age,limit)
{
    try {
       var result =  await client.db('crud').collection('users').find({
           age:{$lte:age}
       }).sort({first_name:1}).limit(limit);
       console.log(await result.toArray())
    } catch (error) {
        console.log(error)
    }
}

const keyify = (obj, prefix = '') => 
  Object.keys(obj).reduce((res, el) => {
    if( Array.isArray(obj[el]) ) {
      return res;
    } else if( typeof obj[el] === 'object' && obj[el] !== null ) {
      return [...res, ...keyify(obj[el], prefix + el + '.')];
    }
    return [...res, prefix + el];
  }, []);

  async function getuser(client,name)
{
    try {
       var result =  await client.db('crud').collection('users').findOne({first_name:name});
       console.log(result)
    } catch (error) {
        console.log(error)
    }
}


//#endregion

module.exports = {register,pageload,update,deleteusers}