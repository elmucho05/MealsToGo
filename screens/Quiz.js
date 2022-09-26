import React, { useState } from 'react';
import {View, Text, SafeAreaView, StyleSheet, Touchable, TouchableOpacity, Modal, Animated} from 'react-native';
import {COLORS, SIZES } from '../utils';
import data from '../data/Domande';
import { StatusBar } from 'expo-status-bar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Quiz() {
    
    const allQuestions = data;
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);

    const validateAnswer= (selectedOption) => {
        let correct_option = allQuestions[currentQuestion]["correct_option"];
        setSelectedOption(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionDisabled(true);
        if(selectedOption === correct_option){
            setScore(score+1);
        }  
        //show next button
        setShowNextButton(true);
    }

    const renderQuesiton = () => {
    return(
        <View>    
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
               {/*Question Counter*/}
                <Text style={{
                    color: 'white',
                    fontSize: 20,
                    opacity: 0.6,
                    marginRight: 2}}>{currentQuestion+1}</Text>
                <Text style={{
                    color:'white',
                    fontSize: 18,
                    opacity: 0.6,
                    marginRight: 2
                }}>/{allQuestions.length}</Text>
            </View>
            <Text style={{color:'white', fontSize:30}}>{allQuestions[currentQuestion]?.question}</Text>
        </View>
        )
    }

    const renderOptions = () => {
        return (
            <View>
                {
                    allQuestions[currentQuestion]?.options.map(option => (
                        <TouchableOpacity
                            onPress={()=> validateAnswer(option)}
                            disabled={isOptionDisabled}
                            key={option}
                            style={{
                                borderWidth: 3, 
                                borderColor: option==correctOption 
                                ? COLORS.success
                                : option==selectedOption 
                                ? COLORS.error 
                                : COLORS.secondary+'40',
                                backgroundColor: option==correctOption 
                                ? COLORS.success +'20'
                                : option==selectedOption 
                                ? COLORS.error +'20'
                                : COLORS.secondary+'20',
                                height: 60, borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'space-between',
                                paddingHorizontal: 20,
                                marginVertical: 10

                        }}>
                        <Text style={{color: 'white', fontSize:20,}}>{option}</Text>
                            {
                                option==correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                    </View>
                                ): option == selectedOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        {/*/<MaterialCommunityIcons name="close" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />*/}
                                    </View>
                                ) : null
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    const renderNextButton = () => {
        if(showNextButton){
            return (
                <View>
                    <TouchableOpacity
                        onPress={handleNext}
                        style={{
                            marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5
                        }}>
                    <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
                </View>
            )
        }else{
            return null
        }
    }

    const restartQuiz = () => {
        setShowScoreModal(false);
        setScore(0);
        setCurrentQuestion(0);
        
        setCorrectOption(null);
        setSelectedOption(null);
        setIsOptionDisabled(false);
        setCorrectOption(null);
        setShowNextButton(false);

       
    }
    
    const handleNext = () => {
        if(currentQuestion == allQuestions.length - 1){
            //last question
            setShowScoreModal(true);
        }else{
            setCurrentQuestion(currentQuestion+1);
            setSelectedOption(null);
            setIsOptionDisabled(false);
            setCorrectOption(null);
            setShowNextButton(false);
        }
    }

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        <View>
            {/*Question*/}
            {renderQuesiton()}   
            
            {/*Options*/}
            {renderOptions()}

            {/*buttonNext*/}
            {renderNextButton()}

            <Modal
               animationType="slide"
               transparent={false}
               visible={showScoreModal}
            >
                <View style={{
                    flex:1,
                    backgorundColor: COLORS.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        width: '90%',
                        borderRadius: 20,
                        padding: 20,
                        backgroundColor: 'white',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize:20, textAlign:'center', paddingBottom: 10}}>Fine della prova!</Text>
                        <TouchableOpacity 
                            onPress={restartQuiz}
                            style={{
                                backgroundColor: COLORS.accent,
                                padding: 20, width: '40%', borderRadius: 20
                        }}>
                            <Text style={{color: 'white', fontSize:20, textAlign:'center'}}>Riprova</Text>
                        </TouchableOpacity>
                    </View>
                
                </View>

            </Modal>
        </View>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        paddingHorizontal: 16,
        backgroundColor: COLORS.background,
        position: 'relative'
    }
  })