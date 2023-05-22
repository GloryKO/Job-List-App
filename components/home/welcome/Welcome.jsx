import React from 'react'
import { View, Text } from 'react-native'
import { useState } from 'react'
import styles from './welcome.style'
import { View,FlatList,Image,Text,TextInput,TouchableOpacity} from 'react-native'
import { useRouter } from 'expo-router'
import {icons,Images,SIZES} from '../../../constants'

const jobTypes = ["Full-Time","Part-Time","Contractor"];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType,setActiveJobType]=useState('Full-Time');

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Adrian</Text>
        <Text style={styles.welcomeMessage}>Find Your Perfect Job </Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput}value="" onChange={()=>{}} placeholder="what jobs are you looking for"/>
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={()=>{}}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabsContainer}>
          <FlatList data={jobTypes} renderItems={(item)=>{
              <TouchableOpacity 
                style={styles.tab(activeJobType,item)} 
                onPress={()=>{
                    setActiveJobType(item);
                    router.push(`...`)
                }}>
                <Text style={styles.tabText(activeJobType,item)}>{item}</Text>
              </TouchableOpacity>
            }}
            keyExtractor={item=>item}
            contentContainerStyle = {{columnGap:SIZES.small}}
            horizontal
          />
      </View>
    </View>
  )
}

export default Welcome