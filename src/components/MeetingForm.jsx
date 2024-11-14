import React, { useState } from 'react';

function MeetingForm() {
  // State variables for the form inputs
  const [location, setLocation] = useState('');
  const [audience, setAudience] = useState('');

  return (
    <>
      {/* Location Select */}
      <label htmlFor="location">Tempat</label>
      <select 
        id="location" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="" disabled>Pilih Tempat</option>
        <option value="Conference Room A">Conference Room A</option>
        <option value="Conference Room B">Conference Room B</option>
        <option value="Online">Online</option>
        <option value="Main Hall">Main Hall</option>
      </select>

      {/* Audience Select */}
      <label htmlFor="audience">Audiens</label>
      <select 
        id="audience" 
        value={audience} 
        onChange={(e) => setAudience(e.target.value)}
      >
        <option value="" disabled>Pilih Audiens</option>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Internal Staff">Internal Staff</option>
        <option value="VIP">VIP</option>
      </select>
    </>
  );
}

export default MeetingForm;
