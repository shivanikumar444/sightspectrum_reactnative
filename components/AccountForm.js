/* eslint-disable react-native/no-inline-styles */
// components/AccountForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AccountForm = () => {
  const dispatch = useDispatch();
  const { name, email, password } = useSelector(state => state);
  const [loading, setLoading] = useState(false);

  const validateEmail = (emailAddress) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddress.toLowerCase());
  };

  const handleSubmit = () => {
    if (name && validateEmail(email) && password.length >= 8) {
      setLoading(true);
      axios.post('http://localhost:8080/api/accounts', { name, email, password })
        .then(response => {
          Alert.alert('Success', 'Account created successfully');
          // Reset form state if needed
        })
        .catch(error => {
          if (error.response) {
            Alert.alert('Error', error.response.data.message || 'Failed to create account');
          } else {
            Alert.alert('Error', 'Network error. Please try again later.');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Alert.alert('Error', 'Please fill in all fields correctly');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Name:</Text>
      <TextInput
        onChangeText={text => dispatch({ type: 'SET_NAME', payload: text })}
        value={name}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Text>Email:</Text>
      <TextInput
        onChangeText={text => dispatch({ type: 'SET_EMAIL', payload: text })}
        value={email}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Text>Password:</Text>
      <TextInput
        secureTextEntry
        onChangeText={text => dispatch({ type: 'SET_PASSWORD', payload: text })}
        value={password}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Create Account" onPress={handleSubmit} />
      {loading && <ActivityIndicator size="large" />}
    </View>
  );
};

export default AccountForm;
