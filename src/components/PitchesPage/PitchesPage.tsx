import React, { useState, useEffect } from 'react';
import { PitchesHeader } from './PitchesHeader';
import { PitchesGrid } from './PitchesGrid';
import { PitchEditor } from './PitchEditor';
import { PitchModal } from './PitchModal';
import { Pitch } from '../../types/pitch';
import { getPitches, createPitch, deletePitch, updatePitch, likePitch } from '../../lib/api/pitch';

import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function PitchesPage() {
  const { user } = useAuth();
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPitch, setSelectedPitch] = useState<Pitch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPitches();
  }, []);

  const loadPitches = async () => {
    try {
      const userId = user?.id || localStorage.getItem('user_id');
      if (!userId) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      const response = await getPitches(userId);
      console.log('Fetched pitches data:', response);
      console.log('Data type:', typeof response);
      console.log('Is Array:', Array.isArray(response));
      
      // Extract the pitches array from the response object
      const pitchesArray = response && response.pitches && Array.isArray(response.pitches) 
        ? response.pitches 
        : [];
      
      console.log('Extracted pitches array:', pitchesArray);
      setPitches(pitchesArray);
    } catch (err) {
      console.error('Error loading pitches:', err);
      setError('Failed to load pitches');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePitch = async (formData: FormData) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        setError('User not logged in');
        return;
      }

      await createPitch(userId, {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        tags: formData.getAll('tags') as string[],
        media: {
          url: formData.get('mediaUrl') as string,
          type: formData.get('mediaType') as string,
        },
        author: {
          name: formData.get('authorName') as string,
          avatar: formData.get('authorAvatar') as string,
          role: formData.get('authorRole') as string,
        },
      });

      await loadPitches();
      setIsEditing(false);
    } catch (err) {
      console.error('Error creating pitch:', err);
      setError('Failed to create pitch');
    }
  };

  const handleLikePitch = async (pitchId: string) => {
    try {
      await likePitch(pitchId);
      await loadPitches();
    } catch (err) {
      console.error('Error liking pitch:', err);
      setError('Failed to like pitch');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  console.log('Rendering PitchesGrid with pitches:', pitches);
  console.log('Is pitches an array?', Array.isArray(pitches));

  return (
    <div className="p-8">
      <PitchesHeader onCreatePitch={() => setIsEditing(true)} />
      <PitchesGrid 
        pitches={Array.isArray(pitches) ? pitches : []} 
        onViewPitch={setSelectedPitch} 
      />

      {isEditing && (
        <PitchEditor
          onSave={handleSavePitch}
          onClose={() => setIsEditing(false)}
        />
      )}

      {selectedPitch && (
        <PitchModal
          pitch={selectedPitch}
          onClose={() => setSelectedPitch(null)}
          onLike={() => handleLikePitch(selectedPitch.id)}
        />
      )}
    </div>
  );
}