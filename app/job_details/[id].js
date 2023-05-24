import React from 'react'
import { Text,SafeAreaView,ScrollView,ActivityIndicator,RefreshControl} from 'react-native';
import {Stack,useRouter,useSearchParams} from 'expo-router';
import { useCallback,useState } from 'react';
import {Company,JobAbout,JobFooter,JobTabs,ScreenHeaderBtn,Specifics} from '../../components';
import {COLORS,icons,SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';


const tabs = ['About','Qualifications','Resposibilities']
const JobDetails = () => {
    const params = useSearchParams(); //get the id of the job using the search params
    const router = useRouter(); //initialize the router
    const [refreshing,setRefreshing] = useState(false);
    const [activeTab,setActiveTab] = useState(tabs[0]);

    const onRefresh =()=>{

    }

    const displayContent =()=>{
      switch(activeTab){
        case "Qualifications":
          return <Specifics title="Qualifications" points={data[0].job_highlights?.Qualifications ?? ['N/A']}/>
        case "About":
          return <JobAbout info={data[0].job_description ?? "No Data Provided"}/>
        case "Responsibilities":
          return <Specifics title="Responsibiliies" points={data[0].job_highlights?.Responsibilities ?? ['N/A']}/> 
        default:
          break;
      }
    }

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
    <>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

        {isLoading ? (<ActivityIndicator size="large" color={COLORS.primary}/>
          ): error ? (<Text>Something Went Wrong</Text>) :
           data.length === 0? (
            <Text>No Data</Text>
          ): (
            <View style={{padding:SIZES.medium,paddingBottom:100}}>

              <Company companyLogo={data[0].employer_logo}
                       jobTitle={data[0].job_title}
                       companyName={data[0].employer_name}
                       location={data[0].job_country}
              />
              <JobTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
              {displayContent()}

            </View>
          )
          
        }

        </ScrollView>
        
        <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}/>
    </>
    </SafeAreaView>
  )
}

export default JobDetails