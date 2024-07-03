import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer, useState } from 'react';
import { ScrollView,Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Sqlite from "expo-sqlite";

export default function App() {

const [list,setList]=useState([]);
const [todo,setTodo]=useState("");
const [header,setHeader]=useState("TodoList")
const [reload,froceUpdate]=useReducer(x=>x+1,0);

const [loading,setLoading]=useState(true);
 

useEffect(()=>{
    
  console.log("UseEffcet is started")
  
async function start(){
  const db=await Sqlite.openDatabaseAsync("mytodolist");  
  try{
   await db.execAsync(`CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL,value TEXT NOT NULL)`);
 console.log("createing table is completed") 
  
} 
  
  catch(errr){
 console.log("Error in load data")
  }
 
  try{
 
     const allRow = await db.getAllAsync('SELECT * FROM test');
   
 setList(allRow); 
 console.log("The data is loaded")
 }
 catch(err){ 
 console.log("Error in fetching")
 }
  
  
  
 setLoading(false);
 
}
start()

},[reload]) ; 



const saveList=async()=>{
 
  const db=await Sqlite.openDatabaseAsync("mytodolist");  
if(todo===""){
return 0;
}
  
try{
await db.runAsync(`INSERT INTO test(value) VALUES(?)`,todo);

froceUpdate(); 

setTodo('')

}
 catch(err){
console.log("Error in sveing data")
 }
  
}

const delList=async(id)=>{

  const db=await Sqlite.openDatabaseAsync("mytodolist");  
  
  try{
    await db.runAsync("DELETE FROM test WHERE id = $value" ,{$value:id})
froceUpdate(); 
  }
  catch(err){
console.log("Error in delete the data");
  }
}





return (


<SafeAreaView>
   <View style={styles.container}>      
      <StatusBar style="dark" />
   <Text style={styles.text} >{header}</Text>

<View style={styles.inall} >
  <TextInput style={styles.in} placeholder='Enter list'  value={todo} onChangeText={(txt)=>setTodo(txt)} />
<View style={styles.btn}>
<Button  title='Save' color={"#8C0036"}  onPress={saveList}/>

</View>
  
</View>
<View style={styles.list}>
<Image source={require("./assets/background.png")} style={{maxWidth:"20%",margin:'auto',maxHeight:80}}/>
<ScrollView contentContainerStyle={{display:'flex',gap:15,justifyContent:'space-between'}} >
   
   {
    list.map((item,index)=>(
   <View style={styles.listTxt}  key={index}>
  <Text   key={index} style={{fontSize:25,color:'white',height:"auto",flex:1}}> {item.value}</Text>
   <Button title='Del'onPress={()=>delList(item.id)}  color={'#8C0036'}  />
   </View>
    
    ))
   }
  
</ScrollView>

</View>
<View style={{backgroundColor:'#8C0036' ,width:'100%',height:'auto',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:"center",

}}>
  <Text style={{color:'white',textAlign:"center"}} >Made by </Text>
  <Text style={{color:'white',textAlign:"center",fontSize:20}} >Ezhil</Text>
 
  </View>  
   
   </View>

   </SafeAreaView>
 
  );
}

const styles = StyleSheet.create({
  container: {  
 
  display:'flex',
  justifyContent:'start',
  alignContent:"center",
  flexDirection:'column',
  backgroundColor:'#071952',
height:'100%',
},

btn:{
  width:"30%",
  margin:"auto",

borderRadius:7,
overflow:'hidden',

},
list:{

  height:"70%",
display:'flex',
gap:20,
marginBottom:20,
borderLeftWidth:2,
borderLeftColor:'black'
},


listTxt:{
  borderWidth:2,
  
borderColor:"white",
  paddingLeft:10,
  fontSize:20,
color:"white",  
width:"75%",
marginHorizontal:'auto',
borderRadius:7,

paddingVertical:5,
paddingHorizontal:8,
display:'flex',
flexDirection:'row',
justifyContent:'space-between',
alignItems:'flex-start',
backgroundColor:'#088395',
marginBottom:10,

}
,
text:{
  color:'white',
  fontSize:40,
  paddingLeft:10,
  backgroundColor:'#37b7c3',
borderBottomWidth:4,
borderBottomColor:"#8C0036"

},
in:{
  borderColor:'#ebf4f6',
  borderWidth:3,
  borderRadius:10,
paddingLeft:20,
width:'90%',
textAlign:'start',
margin:'auto', 
backgroundColor:'white',

height:50,
fontSize:20,

},
inall:{

  width:'90%',
display:'flex',
gap:10,
padding:10,
marginHorizontal:'auto',
}



});
