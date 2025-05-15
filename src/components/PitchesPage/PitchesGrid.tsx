// import React from 'react';
// import { PitchCard } from './PitchCard';
// import { Pitch } from '../../types/pitch';

// interface PitchesGridProps {
//   pitches: Pitch[];
//   onViewPitch: (pitch: Pitch) => void;
// }

// export function PitchesGrid({ pitches, onViewPitch }: PitchesGridProps) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {pitches.map((pitch) => (
//         <PitchCard
//           key={pitch.id}
//           pitch={pitch}
//           onView={onViewPitch}
//         />
//       ))}
//     </div>
//   );
// }

import React from 'react';
import { PitchCard } from './PitchCard';
import { Pitch } from '../../types/pitch';

interface PitchesGridProps {
  pitches: Pitch[];
  onViewPitch: (pitch: Pitch) => void;
}

export function PitchesGrid({ pitches, onViewPitch }: PitchesGridProps) {
  console.log('PitchesGrid received pitches:', pitches);
  console.log('PitchesGrid pitches type:', typeof pitches);
  console.log('Is array in PitchesGrid:', Array.isArray(pitches));
  
  // Ensure we have an array to work with
  const pitchesArray = Array.isArray(pitches) ? pitches : [];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {pitchesArray.length > 0 ? (
        pitchesArray.map((pitch) => (
          <PitchCard
            key={pitch.id}
            pitch={pitch}
            onView={onViewPitch}
          />
        ))
      ) : (
        <div className="col-span-2 text-center py-8 text-gray-500">
          No pitches found. Create your first pitch!
        </div>
      )}
    </div>
  );
}