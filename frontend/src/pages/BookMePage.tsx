import React, { useState } from 'react';
import { BACKEND_API } from '../components/config';
import { useNavigate } from 'react-router-dom';

const initialCompanion = {
    fullname: '',
    relationship: '',
    dob: '',
    phone: '',
    passportnumber: '',
    passportexpiry: '',
};

const labelStyle = {
    display: 'block',
    marginBottom: 4,
    fontWeight: 600,
    color: '#222',
    fontSize: 15,
};

const inputStyle = {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    border: '1px solid #ccc',
    marginBottom: 12,
    fontSize: 15,
    color: '#222',
    background: '#fff',
};

const hotelOptions = [
    'Beachfront Resort',
    'Boutique Hotel',
    'Luxury Hotel',
    'All-inclusive Resort',
    'Traditional/local style hotel',
    'Urban/modern Hotel',
    'Eco friendly /green hotel',
    'Other',
];

const durationOptions = [
    '3-5 days',
    '6-7 days',
    '8-10 days',
    'More than 10 days',
    'Specify',
];

const holidayVibeOptions = [
    'Nature/Adventure (e.g. hiking, nature reserve, eco-tourism)',
    'City Escape (e.g. sightseeing, shopping, culture)',
    'A mix of both',
];

const flightVisaOptions = [
    'Arrange my flight booking',
    'Arrange visa application (if needed)',
    'I will handle flight and visa arrangements myself',
];

const packageTypeOptions = [
    'Budget package (Economical options, great deals)',
    'Mid-range Package (comfortable, well-rounded experience)',
    'Luxury package (High end services, exclusive experience)',
];

// Schengen Visa Application Form Component


const BookMePage: React.FC = () => {
    // Step state
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    // Personal Info
    const [personal, setPersonal] = useState({
        fullname: '',
        dob: '',
        phone: '',
        countrycode: '+',
        email: '',
        address: '',
        nationality: '',
        passportnumber: '',
        passportexpiry: '',
    });
    // Travel Companions (optional, start empty)
    const [companions, setCompanions] = useState([] as typeof initialCompanion[]);
    // Emergency Contact
    const [emergency, setEmergency] = useState({
        fullname: '',
        relationship: '',
        phone: '',
        email: '',
        address: '',
    });
    // Confirmation
    const [confirmed, setConfirmed] = useState(false);
    // Holiday location preferences (step 2)
    const [locationPrefs, setLocationPrefs] = useState({
        location1: '',
        location2: '',
        location3: '',
        suggestforme: 'no',
    });
    // Hotel Aesthetic Preferences (step 3)
    const [hotelPrefs, setHotelPrefs] = useState<string[]>([]);
    const [hotelOther, setHotelOther] = useState('');
    // Duration of Stay (step 4)
    const [duration, setDuration] = useState('');
    const [durationSpecify, setDurationSpecify] = useState('');
    // Holiday Vibe (step 5)
    const [holidayVibe, setHolidayVibe] = useState('');
    // Flight and Visa Arrangement (step 6)
    const [flightVisa, setFlightVisa] = useState<string[]>([]);
    // Package Type (step 7)
    const [packageType, setPackageType] = useState('');
    // Add new state for holiday budget and additional notes
    const [holidayBudget, setHolidayBudget] = useState('');
    const [holidayBudgetCurrency, setHolidayBudgetCurrency] = useState('');
    const [additionalNotes, setAdditionalNotes] = useState('');

    // Solo trip if no companions or all companions are empty
    const isSoloTrip = companions.length === 0 || companions.every(comp => Object.values(comp).every(v => v === ''));

    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPersonal(p => ({ ...p, [name]: value }));
    };
    const handleCompanionChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCompanions(cs => cs.map((c, i) => i === idx ? { ...c, [name]: value } : c));
    };
    const handleAddCompanion = () => {
        setCompanions(cs => [...cs, { ...initialCompanion }]);
    };
    const handleRemoveCompanion = (idx: number) => {
        setCompanions(cs => cs.filter((_, i) => i !== idx));
    };
    const handleEmergencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmergency(ec => ({ ...ec, [name]: value }));
    };
    const handleLocationPrefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocationPrefs(lp => ({ ...lp, [name]: value }));
    };
    const handleHotelPrefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (value === 'Other') {
            if (!checked) setHotelOther('');
        }
        setHotelPrefs(prev =>
            checked ? [...prev, value] : prev.filter(opt => opt !== value)
        );
    };
    const handleHotelOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHotelOther(e.target.value);
    };
    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(e.target.value);
        if (e.target.value !== 'Specify') setDurationSpecify('');
    };
    const handleDurationSpecifyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDurationSpecify(e.target.value);
    };
    const handleHolidayVibeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHolidayVibe(e.target.value);
    };
    const handleFlightVisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (value === 'I will handle flight and visa arrangements myself') {
            setFlightVisa([value]);
        } else {
            setFlightVisa(prev =>
                checked
                    ? [...prev.filter(opt => opt !== 'I will handle flight and visa arrangements myself'), value]
                    : prev.filter(opt => opt !== value)
            );
        }
    };
    const handlePackageTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPackageType(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmed) return;
        // if (isSoloTrip) {
        setStep(2);
        // } else {
        //     alert('Booking confirmed!');
        // }
    };

    const handleMergedSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dura = duration != " " ? duration : durationSpecify;
        let data = {
            personalinfo: personal,
            location: locationPrefs,
            duration: dura,
            hotelpref: [...hotelPrefs, hotelOther],
            holidayvibe: holidayVibe,
            flightvisa: flightVisa,
            packagetype: packageType,
            holidaybudget: holidayBudget,
            holidaybudgetcurrency: holidayBudgetCurrency,
            additionalnotes: additionalNotes,
            companion: [...companions],
            emergencycontact: emergency,
        };
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                // @ts-ignore
                const element = data[key];
                console.log(key, ": ", element);
            }
        };
        const token = localStorage.getItem('token');
        try {
            let res = await fetch(BACKEND_API + '/api/trip/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            console.log(await res.json());
            if (!res.ok) throw new Error('Failed to save booking');
            alert('Booking confirmed! trying ');
            setTimeout(() => navigate('/'), 1200);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fa' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: 600, width: '100%', padding: 24, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001', color: '#222' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 24,
                    }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 12 }}>
                            <path d="M2 16.5L22 7M2 16.5L9.5 18.5M2 16.5L6.5 10.5M22 7L14.5 5M22 7L17.5 13M17.5 13L9.5 18.5M17.5 13L6.5 10.5M6.5 10.5L14.5 5" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1 style={{
                            fontSize: '2.2rem',
                            fontWeight: 800,
                            background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            margin: 0,
                            letterSpacing: 1.5,
                        }}>
                            Book a Trip
                        </h1>
                    </div>
                    {step === 1 && (
                        <form onSubmit={handleSubmit}>
                            {/* Section 1: Personal Information */}
                            <h2 style={{ color: '#1976d2', marginBottom: 8 }}>Client Contact Details Form</h2>
                            <div style={{ fontWeight: 600, margin: '18px 0 8px 0', fontSize: 18 }}>Personal Information</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                <div style={{ flex: 1, minWidth: 220 }}>
                                    <label htmlFor="personal-fullName" style={labelStyle}>Full Name</label>
                                    <input id="personal-fullName" name="fullname" value={personal.fullname} onChange={handlePersonalChange} style={inputStyle} required />
                                </div>
                                <div style={{ flex: 1, minWidth: 180 }}>
                                    <label htmlFor="personal-dob" style={labelStyle}>Date of Birth</label>
                                    <input id="personal-dob" name="dob" type="date" value={personal.dob} onChange={handlePersonalChange} style={inputStyle} required />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                <div style={{ width: 80 }}>
                                    <label htmlFor="personal-countryCode" style={labelStyle}>Country Code</label>
                                    <input id="personal-countryCode" name="countrycode" value={personal.countrycode} onChange={handlePersonalChange} style={inputStyle} required />
                                </div>
                                <div style={{ flex: 1, minWidth: 180 }}>
                                    <label htmlFor="personal-phone" style={labelStyle}>Phone Number</label>
                                    <input id="personal-phone" name="phone" value={personal.phone} onChange={handlePersonalChange} style={inputStyle} required />
                                </div>
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <label htmlFor="personal-email" style={labelStyle}>Email</label>
                                <input id="personal-email" name="email" type="email" value={personal.email} onChange={handlePersonalChange} style={inputStyle} required />
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <label htmlFor="personal-address" style={labelStyle}>Full Residential Address</label>
                                <input id="personal-address" name="address" value={personal.address} onChange={handlePersonalChange} style={inputStyle} required />
                            </div>
                            <div style={{ marginTop: 8 }}>
                                <label htmlFor="personal-nationality" style={labelStyle}>Nationality</label>
                                <input id="personal-nationality" name="nationality" value={personal.nationality} onChange={handlePersonalChange} style={inputStyle} required />
                            </div>
                            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                <div style={{ flex: 1, minWidth: 180 }}>
                                    <label htmlFor="personal-passportNumber" style={labelStyle}>Passport Number</label>
                                    <input id="personal-passportNumber" name="passportnumber" value={personal.passportnumber} onChange={handlePersonalChange} style={inputStyle} required />
                                </div>
                                <div style={{ flex: 1, minWidth: 180 }}>
                                    <label htmlFor="personal-passportExpiry" style={labelStyle}>Passport Expiry Date</label>
                                    <input id="personal-passportExpiry" name="passportexpiry" type="date" value={personal.passportexpiry} onChange={handlePersonalChange} style={inputStyle} required />
                                </div>
                            </div>

                            {/* Section 2: Travel Companion Information (optional) */}
                            <div style={{ fontWeight: 600, margin: '28px 0 8px 0', fontSize: 18 }}>Travel Companion Information <span style={{ fontWeight: 400, fontSize: 14, color: '#888' }}>(optional)</span></div>
                            {companions.length === 0 && (
                                <button type="button" onClick={handleAddCompanion} style={{ marginBottom: 20, background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer' }}>
                                    Add Travel Companion
                                </button>
                            )}
                            {companions.map((comp, idx) => (
                                <div key={idx} style={{ border: '1px solid #e0e0e0', borderRadius: 6, padding: 12, marginBottom: 12, background: '#fafbfc' }}>
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                                        <div style={{ flex: 1, minWidth: 180 }}>
                                            <label htmlFor={`companion-fullName-${idx}`} style={labelStyle}>Full Name of Travel Companion</label>
                                            <input id={`companion-fullName-${idx}`} name="fullname" value={comp.fullname} onChange={e => handleCompanionChange(idx, e)} style={inputStyle} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 140 }}>
                                            <label htmlFor={`companion-relationship-${idx}`} style={labelStyle}>Relationship to Traveller</label>
                                            <input id={`companion-relationship-${idx}`} name="relationship" value={comp.relationship} onChange={e => handleCompanionChange(idx, e)} style={inputStyle} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                                        <div style={{ flex: 1, minWidth: 140 }}>
                                            <label htmlFor={`companion-dob-${idx}`} style={labelStyle}>Date of Birth</label>
                                            <input id={`companion-dob-${idx}`} name="dob" type="date" value={comp.dob} onChange={e => handleCompanionChange(idx, e)} style={inputStyle} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 140 }}>
                                            <label htmlFor={`companion-phone-${idx}`} style={labelStyle}>Phone Number</label>
                                            <input id={`companion-phone-${idx}`} name="phone" value={comp.phone} onChange={e => handleCompanionChange(idx, e)} style={inputStyle} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        <div style={{ flex: 1, minWidth: 140 }}>
                                            <label htmlFor={`companion-passportNumber-${idx}`} style={labelStyle}>Passport Number</label>
                                            <input id={`companion-passportNumber-${idx}`} name="passportnumber" value={comp.passportnumber} onChange={e => handleCompanionChange(idx, e)} style={inputStyle} />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 140 }}>
                                            <label htmlFor={`companion-passportExpiry-${idx}`} style={labelStyle}>Passport Expiry Date</label>
                                            <input id={`companion-passportExpiry-${idx}`} name="passportexpiry" type="date" value={comp.passportexpiry} onChange={e => handleCompanionChange(idx, e)} style={inputStyle} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button type="button" onClick={() => handleRemoveCompanion(idx)} style={{ marginTop: 8, color: '#d32f2f', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            {companions.length > 0 && (
                                <button type="button" onClick={handleAddCompanion} style={{ marginBottom: 20, background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)', color: '#fff', fontWeight: 600, border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer' }}>
                                    Add Another Companion
                                </button>
                            )}

                            {/* Section 3: Emergency Contact Information */}
                            <div style={{ fontWeight: 600, margin: '28px 0 8px 0', fontSize: 18 }}>Emergency Contact Information</div>
                            <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                                <div style={{ flex: 1, minWidth: 180 }}>
                                    <label htmlFor="emergency-fullName" style={labelStyle}>Full Name of Emergency Contact</label>
                                    <input id="emergency-fullName" name="fullname" value={emergency.fullname} onChange={handleEmergencyChange} style={inputStyle} required />
                                </div>
                                <div style={{ flex: 1, minWidth: 140 }}>
                                    <label htmlFor="emergency-relationship" style={labelStyle}>Relationship to Traveller</label>
                                    <input id="emergency-relationship" name="relationship" value={emergency.relationship} onChange={handleEmergencyChange} style={inputStyle} required />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                                <div style={{ flex: 1, minWidth: 140 }}>
                                    <label htmlFor="emergency-phone" style={labelStyle}>Emergency Contact Phone Number</label>
                                    <input id="emergency-phone" name="phone" value={emergency.phone} onChange={handleEmergencyChange} style={inputStyle} required />
                                </div>
                                <div style={{ flex: 1, minWidth: 140 }}>
                                    <label htmlFor="emergency-email" style={labelStyle}>Emergency Contact Email Address</label>
                                    <input id="emergency-email" name="email" type="email" value={emergency.email} onChange={handleEmergencyChange} style={inputStyle} required />
                                </div>
                            </div>
                            <div style={{ marginBottom: 18 }}>
                                <label htmlFor="emergency-address" style={labelStyle}>Emergency Contact Address</label>
                                <input id="emergency-address" name="address" value={emergency.address} onChange={handleEmergencyChange} style={inputStyle} required />
                            </div>

                            {/* Confirmation Checkbox */}
                            <div style={{ margin: '18px 0 18px 0', display: 'flex', alignItems: 'center', color: '#222' }}>
                                <input type="checkbox" id="confirm" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ marginRight: 10 }} />
                                <label htmlFor="confirm" style={{ fontSize: 15 }}>
                                    I confirm that the information provided above is correct to the best of my knowledge.
                                </label>
                            </div>
                            <button type="submit" disabled={!confirmed} style={{ width: '100%', background: confirmed ? 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)' : '#b0bec5', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 6, padding: '12px 0', cursor: confirmed ? 'pointer' : 'not-allowed', marginTop: 8 }}>
                                Next
                            </button>
                        </form>
                    )}
                    {step === 2 && (
                        <form onSubmit={handleMergedSubmit}>
                            <h2 style={{ color: '#1976d2', marginBottom: 8 }}>Holiday Preferences & Details</h2>
                            {/* Holiday Location Preference */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Holiday Location Preference</div>
                                <p style={{ marginBottom: 12 }}>
                                    Please provide three holiday location preferences or you may choose for us to pick a location for you.
                                </p>
                                <div style={{ marginBottom: 12 }}>
                                    <label htmlFor="location1" style={labelStyle}>Location 1</label>
                                    <input id="location1" name="location1" value={locationPrefs.location1} onChange={handleLocationPrefChange} style={inputStyle} required={locationPrefs.suggestforme === 'no'} disabled={locationPrefs.suggestforme === 'yes'} />
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                    <label htmlFor="location2" style={labelStyle}>Location 2</label>
                                    <input id="location2" name="location2" value={locationPrefs.location2} onChange={handleLocationPrefChange} style={inputStyle} required={locationPrefs.suggestforme === 'no'} disabled={locationPrefs.suggestforme === 'yes'} />
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                    <label htmlFor="location3" style={labelStyle}>Location 3</label>
                                    <input id="location3" name="location3" value={locationPrefs.location3} onChange={handleLocationPrefChange} style={inputStyle} required={locationPrefs.suggestforme === 'no'} disabled={locationPrefs.suggestforme === 'yes'} />
                                </div>
                                <div style={{ marginBottom: 12 }}>
                                    <span style={{ fontWeight: 600, color: '#222', marginRight: 12 }}>Please pick/suggest for me:</span>
                                    <label style={{ marginRight: 16 }}>
                                        <input type="radio" name="suggestforme" value="yes" checked={locationPrefs.suggestforme === 'yes'} onChange={handleLocationPrefChange} /> Yes
                                    </label>
                                    <label>
                                        <input type="radio" name="suggestforme" value="no" checked={locationPrefs.suggestforme === 'no'} onChange={handleLocationPrefChange} /> No
                                    </label>
                                </div>
                            </div>
                            {/* Hotel Aesthetic Preferences */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Hotel Aesthetic Preferences</div>
                                <p style={{ marginBottom: 12 }}>What type of hotel aesthetic would you prefer?</p>
                                {hotelOptions.map(option => (
                                    <label key={option} style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                                        <input
                                            type="checkbox"
                                            value={option}
                                            checked={hotelPrefs.includes(option)}
                                            onChange={handleHotelPrefChange}
                                            style={{ marginRight: 8 }}
                                        />
                                        {option}
                                        {option === 'Other' && hotelPrefs.includes('Other') && (
                                            <input
                                                type="text"
                                                placeholder="Please specify"
                                                value={hotelOther}
                                                onChange={handleHotelOtherChange}
                                                style={{ ...inputStyle, display: 'inline-block', width: 200, marginLeft: 12, marginBottom: 0 }}
                                            />
                                        )}
                                    </label>
                                ))}
                            </div>
                            {/* Duration of Stay */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Duration of Stay</div>
                                <p style={{ marginBottom: 12 }}>How many days would you like to spend on your holiday?</p>
                                {durationOptions.map(option => (
                                    <label key={option} style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
                                        <input
                                            type="radio"
                                            name="duration"
                                            value={option}
                                            checked={duration === option}
                                            onChange={handleDurationChange}
                                            style={{ marginRight: 8 }}
                                        />
                                        {option}
                                        {option === 'Specify' && duration === 'Specify' && (
                                            <input
                                                type="number"
                                                min={1}
                                                placeholder="Number of days"
                                                value={durationSpecify}
                                                onChange={handleDurationSpecifyChange}
                                                style={{ ...inputStyle, display: 'inline-block', width: 120, marginLeft: 12, marginBottom: 0 }}
                                            />
                                        )}
                                    </label>
                                ))}
                            </div>
                            {/* Holiday Vibe */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Holiday Vibe</div>
                                <p style={{ marginBottom: 12 }}>What kind of vibe are you looking for in your holiday?</p>
                                {holidayVibeOptions.map(option => (
                                    <label key={option} style={{ display: 'block', marginBottom: 10, fontWeight: 500 }}>
                                        <input
                                            type="radio"
                                            name="holidayVibe"
                                            value={option}
                                            checked={holidayVibe === option}
                                            onChange={handleHolidayVibeChange}
                                            style={{ marginRight: 8 }}
                                            required
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            {/* Flight and Visa Arrangement */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Flight and Visa Arrangement</div>
                                <p style={{ marginBottom: 12 }}>Would you like us to arrange your flight booking and visa application (if applicable) for your chosen location?</p>
                                {flightVisaOptions.map(option => (
                                    <label key={option} style={{ display: 'block', marginBottom: 10, fontWeight: 500 }}>
                                        <input
                                            type={option === 'I will handle flight and visa arrangements myself' ? 'radio' : 'checkbox'}
                                            name="flightVisa"
                                            value={option}
                                            checked={flightVisa.includes(option)}
                                            onChange={handleFlightVisaChange}
                                            style={{ marginRight: 8 }}
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            {/* Holiday Package Type */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Holiday Package Type</div>
                                <p style={{ marginBottom: 12 }}>What kind of holiday package are you interested in based on your budget?</p>
                                {packageTypeOptions.map(option => (
                                    <label key={option} style={{ display: 'block', marginBottom: 10, fontWeight: 500 }}>
                                        <input
                                            type="radio"
                                            name="packageType"
                                            value={option}
                                            checked={packageType === option}
                                            onChange={handlePackageTypeChange}
                                            style={{ marginRight: 8 }}
                                            required
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            {/* Holiday Budget */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Holiday Budget</div>
                                <p style={{ marginBottom: 12 }}>Please specify your total holiday budget for the holiday. This budget will cover holiday location research, hotel booking and payment, flight booking and visa application (if applicable). What is your budget?</p>
                                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
                                    <input
                                        type="text"
                                        placeholder="Amount"
                                        value={holidayBudget}
                                        onChange={e => setHolidayBudget(e.target.value)}
                                        style={{ ...inputStyle, width: 180, marginBottom: 0 }}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Currency (e.g. USD, EUR, GBP)"
                                        value={holidayBudgetCurrency}
                                        onChange={e => setHolidayBudgetCurrency(e.target.value)}
                                        style={{ ...inputStyle, width: 180, marginBottom: 0 }}
                                        required
                                    />
                                </div>
                                <div style={{ fontSize: 14, color: '#1976d2', marginTop: 2 }}>
                                    Note: If you have selected flight and/or visa arrangement, these will be included in the total budget.
                                </div>
                            </div>
                            {/* Additional Requests/Notes */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>Additional Requests/Notes</div>
                                <p style={{ marginBottom: 12 }}>Is there anything else you'd like to mention or any special requests for your holiday?</p>
                                <textarea
                                    placeholder="Type your requests or notes here..."
                                    value={additionalNotes}
                                    onChange={e => setAdditionalNotes(e.target.value)}
                                    style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                                />
                            </div>
                            <button type="submit" style={{ width: '100%', background: 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 6, padding: '12px 0', cursor: 'pointer', marginTop: 8 }}>
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookMePage;
