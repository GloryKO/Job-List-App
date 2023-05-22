import React from 'react'
import { Text,SafeAreaView,ScrollView,ActivityIndicator,RefreshControl} from 'react-native';
import {Stack,useRouter,useSearchParams} from 'expo-router';
import { useCallback,useState } from 'react';
import {Company,JobAbout,JobFooter,JobTabs,ScreenHeaderBtn,Specifics} from '../../components';
import {COLORS,icons,SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';

const JobDetails = () => {
    const params = useSearchParams(); //get the id of the job using the search params
    const router = useSearchRouter(); //initialize the router
    //destructure the ffg from the custom hook useFetch we created 
    const {data,isLoading,error,reFetch} = useFetch('job-details',{
        'job_id': params.id
    })
  return (
    <SafeAreaView>
        <Stack.Screen options={{headerStyle : {backgroundColor:COLORS.lightWhite},
        headerShadowVisible:false,headerBackVisible:false,
        headerLeft: ()=>(<ScreenHeaderBtn iconUrl='{icons.left}' dimension="60%" handlePress={()=>router.back}/>),
        headerRight: ()=>(<ScreenHeaderBtn iconUrl='{icons.share}'dimension="60%"/>),
        headerTitle: " "
        }}
    />

    </SafeAreaView>
  )
}

export default JobDetails