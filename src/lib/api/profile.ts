import axios from 'axios';
import { LocalStorage } from '../storage/localStorage';

const API_BASE_URL = 'http://localhost:3000/api';

export const ProfileAPI = {
  // Get the current user's profile
  getProfile: async () => {
    try {
      console.log('📋 [Profile API] Fetching user profile');
      
      const token = LocalStorage.getAuthToken();
      if (!token) {
        console.error('❌ [Profile API] No auth token available');
        throw new Error('Authentication required');
      }
      
      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('✅ [Profile API] Profile fetched successfully');
      return {
        data: response.data,
        error: null
      };
    } catch (error: any) {
      console.error('❌ [Profile API] Get profile error:', error.response?.data || error.message);
      return {
        data: null,
        error: new Error(error.response?.data?.error || 'Failed to fetch profile')
      };
    }
  },
  
  // Update the user's profile
  updateProfile: async (profileData: any) => {
    try {
      console.log('📋 [Profile API] Updating profile with data:', profileData);
      
      const token = LocalStorage.getAuthToken();
      if (!token) {
        console.error('❌ [Profile API] No auth token available');
        throw new Error('Authentication required');
      }
      
      const response = await axios.put(`${API_BASE_URL}/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('✅ [Profile API] Profile updated successfully');
      return {
        data: response.data,
        error: null
      };
    } catch (error: any) {
      console.error('❌ [Profile API] Update profile error:', error.response?.data || error.message);
      return {
        data: null,
        error: new Error(error.response?.data?.error || 'Failed to update profile')
      };
    }
  },
  
  // Create a new profile
  createProfile: async (profileData: any) => {
    try {
      console.log('📋 [Profile API] Creating new profile with data:', profileData);
      
      const token = LocalStorage.getAuthToken();
      if (!token) {
        console.error('❌ [Profile API] No auth token available');
        throw new Error('Authentication required');
      }
      
      const response = await axios.post(`${API_BASE_URL}/profile`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('✅ [Profile API] Profile created successfully');
      return {
        data: response.data,
        error: null
      };
    } catch (error: any) {
      console.error('❌ [Profile API] Create profile error:', error.response?.data || error.message);
      return {
        data: null,
        error: new Error(error.response?.data?.error || 'Failed to create profile')
      };
    }
  },
  
  // Complete the onboarding process
  completeOnboarding: async () => {
    try {
      console.log('📋 [Profile API] Completing onboarding');
      
      const token = LocalStorage.getAuthToken();
      if (!token) {
        console.error('❌ [Profile API] No auth token available');
        throw new Error('Authentication required');
      }
      
      const response = await axios.put(`${API_BASE_URL}/profile/complete-onboarding`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('✅ [Profile API] Onboarding completed successfully');
      return {
        data: response.data,
        error: null
      };
    } catch (error: any) {
      console.error('❌ [Profile API] Complete onboarding error:', error.response?.data || error.message);
      return {
        data: null,
        error: new Error(error.response?.data?.error || 'Failed to complete onboarding')
      };
    }
  }
}; 