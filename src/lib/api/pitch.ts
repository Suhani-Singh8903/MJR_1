// import { LocalStorage } from '../storage/localStorage';
// import { Pitch } from '../../types/pitch';

// export const PitchAPI = {
//   getAllPitches: () => {
//     const pitches = LocalStorage.getPitches();
//     return Promise.resolve({ data: pitches });
//   },
  
//   createPitch: (formData: FormData) => {
//     const user = LocalStorage.getUser();
//     const profile = LocalStorage.getProfile();

//     if (!user || !profile) {
//       return Promise.reject(new Error('User not authenticated'));
//     }

//     const title = formData.get('title') as string;
//     const description = formData.get('description') as string;
//     const mediaType = formData.get('mediaType') as 'image' | 'video';
//     const mediaUrl = formData.get('mediaUrl') as string;
//     const tags = JSON.parse(formData.get('tags') as string);

//     const newPitch: Pitch = {
//       id: Date.now().toString(),
//       title,
//       description,
//       media: {
//         type: mediaType,
//         url: mediaUrl
//       },
//       author: {
//         id: user.id,
//         name: user.full_name,
//         avatar: profile.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
//         role: profile.role || 'Entrepreneur'
//       },
//       tags,
//       likes: 0,
//       comments: 0,
//       createdAt: new Date().toISOString()
//     };

//     LocalStorage.addPitch(newPitch);
//     return Promise.resolve({ data: newPitch });
//   },
  
//   likePitch: (id: string) => {
//     const pitches = LocalStorage.getPitches();
//     const updatedPitches = pitches.map(pitch => 
//       pitch.id === id 
//         ? { ...pitch, likes: pitch.likes + 1 }
//         : pitch
//     );
//     LocalStorage.setPitches(updatedPitches);
//     return Promise.resolve({ data: { success: true } });
//   }
// };

import api from '../axios'; // assumes axios is already configured here

// CREATE a new pitch
export async function createPitch(userId: string, pitchData: any) {
  try {
    const response = await api.post('/createPitch', {
      user_id: userId,
      ...pitchData,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating pitch:', error);
    throw error;
  }
}

// READ all pitches for a user
export async function getPitches(userId: string) {
  try {
    const response = await api.get(`/pitches/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pitches:', error);
    throw error;
  }
}

// UPDATE a pitch
export async function updatePitch(userId: string, pitchId: string, updatedData: any) {
  try {
    const response = await api.put(`/updatePitch/${userId}/${pitchId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating pitch:', error);
    throw error;
  }
}

// DELETE a pitch
export async function deletePitch(userId: string, pitchId: string) {
  try {
    const response = await api.delete(`/deletePitch/${userId}/${pitchId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting pitch:', error);
    throw error;
  }
}
// ✅ LIKE a pitch
export async function likePitch(pitchId: string) {
  try {
    const response = await api.post(`/likePitch/${pitchId}`);
    return response.data;
  } catch (error) {
    console.error('Error liking pitch:', error);
    throw error;
  }
}