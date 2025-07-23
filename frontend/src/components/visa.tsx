import React, { useState } from 'react';

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

export const SchengenVisaForm: React.FC = () => {
    const [form, setForm] = useState({
        // Personal Information
        fullName: '', gender: '', dob: '', placeOfBirth: '', countryOfBirth: '', currentNationality: '', nationalityAtBirth: '', maritalStatus: '', nationalId: '', passportNumber: '', passportIssueDate: '', passportExpiryDate: '', passportPlaceOfIssue: '',
        // Contact Information
        homeAddress: '', city: '', state: '', postalCode: '', country: '', phone: '', email: '',
        // Occupation and Employer
        occupation: '', employerName: '', employerAddress: '', employerPhone: '', employerEmail: '',
        // Travel Information
        purpose: '', memberStates: '', firstEntry: '', entriesRequested: '', arrivalDate: '', departureDate: '',
        // Hotel/Host
        hostName: '', hostAddress: '', hostPhone: '',
        // Travel Insurance
        insuranceProvider: '', policyNumber: '', coverageFrom: '', coverageTo: '',
        // Financial Means
        travelCostsBy: '', sponsorName: '', sponsorRelationship: '', sponsorInfo: '',
        // Additional Info
        refusedVisa: '', refusedVisaDetails: '', previousVisa: '', previousVisaDetails: '',
    });
    const [confirmed, setConfirmed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // Helper to check if all required fields are filled
    const allFieldsFilled = Object.entries(form).every(([k, v]) => {
        // Only require sponsor fields if travelCostsBy is 'sponsor'
        if ((k === 'sponsorName' || k === 'sponsorRelationship' || k === 'sponsorInfo') && form.travelCostsBy !== 'sponsor') return true;
        // Only require refusedVisaDetails if refusedVisa is 'yes'
        if (k === 'refusedVisaDetails' && form.refusedVisa !== 'yes') return true;
        // Only require previousVisaDetails if previousVisa is 'yes'
        if (k === 'previousVisaDetails' && form.previousVisa !== 'yes') return true;
        return v.trim() !== '';
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (!allFieldsFilled || !confirmed) return;
        alert('Visa application data collected!');
        // Here you would send the data to backend
    };

    const inputS = { ...inputStyle, marginBottom: 10 };
    const sectionTitle = { color: '#1976d2', fontWeight: 700, fontSize: 18, margin: '24px 0 8px 0' };

    return (
        <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div style={sectionTitle}>Personal Information</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 220 }}>
                    <label style={labelStyle}>Full Name</label>
                    <input name="fullName" value={form.fullName} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={labelStyle}>Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange} style={inputS} required>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Date of Birth</label>
                    <input name="dob" type="date" value={form.dob} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Place of Birth</label>
                    <input name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Country of Birth</label>
                    <input name="countryOfBirth" value={form.countryOfBirth} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Current Nationality</label>
                    <input name="currentNationality" value={form.currentNationality} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Nationality at Birth (if different)</label>
                    <input name="nationalityAtBirth" value={form.nationalityAtBirth} onChange={handleChange} style={inputS} />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Marital Status</label>
                    <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} style={inputS} required>
                        <option value="">Select</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>National ID Number (if applicable)</label>
                    <input name="nationalId" value={form.nationalId} onChange={handleChange} style={inputS} />
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Passport Number</label>
                    <input name="passportNumber" value={form.passportNumber} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Passport Issue Date</label>
                    <input name="passportIssueDate" type="date" value={form.passportIssueDate} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Passport Expiry Date</label>
                    <input name="passportExpiryDate" type="date" value={form.passportExpiryDate} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Passport Image</label>
                    <input name="passportPlaceOfIssue" value={form.passportPlaceOfIssue} onChange={handleChange} style={inputS} required type='file'/>
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Place of Issue</label>
                    <input name="passportPlaceOfIssue" value={form.passportPlaceOfIssue} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            {/* Contact Information */}
            <div style={sectionTitle}>Contact Information</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 2, minWidth: 220 }}>
                    <label style={labelStyle}>Home Address</label>
                    <input name="homeAddress" value={form.homeAddress} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={labelStyle}>City</label>
                    <input name="city" value={form.city} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={labelStyle}>State/Province</label>
                    <input name="state" value={form.state} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={labelStyle}>Postal Code</label>
                    <input name="postalCode" value={form.postalCode} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                    <label style={labelStyle}>Country</label>
                    <input name="country" value={form.country} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Email Address</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            {/* Occupation and Employer Details */}
            <div style={sectionTitle}>Occupation and Employer Details</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Current Occupation</label>
                    <input name="occupation" value={form.occupation} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Employer/Company Name</label>
                    <input name="employerName" value={form.employerName} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 2, minWidth: 220 }}>
                    <label style={labelStyle}>Employer Address</label>
                    <input name="employerAddress" value={form.employerAddress} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Employer Phone</label>
                    <input name="employerPhone" value={form.employerPhone} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 160 }}>
                    <label style={labelStyle}>Employer Email</label>
                    <input name="employerEmail" type="email" value={form.employerEmail} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            {/* Travel Information */}
            <div style={sectionTitle}>Travel Information</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Purpose of Journey</label>
                    <input name="purpose" value={form.purpose} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Member States of Destination</label>
                    <input name="memberStates" value={form.memberStates} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>First Entry Schengen Country</label>
                    <input name="firstEntry" value={form.firstEntry} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Number of Entries Requested</label>
                    <input name="entriesRequested" value={form.entriesRequested} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Intended Date of Arrival in Schengen Area</label>
                    <input name="arrivalDate" type="date" value={form.arrivalDate} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Intended Date of Departure</label>
                    <input name="departureDate" type="date" value={form.departureDate} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            {/* Hotel/Host */}
            <div style={sectionTitle}>Hotel/Host</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Name</label>
                    <input name="hostName" value={form.hostName} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 2, minWidth: 220 }}>
                    <label style={labelStyle}>Full Address in France</label>
                    <input name="hostAddress" value={form.hostAddress} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Contact Number</label>
                    <input name="hostPhone" value={form.hostPhone} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            {/* Travel Insurance */}
            <div style={sectionTitle}>Travel Insurance</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Insurance Provider</label>
                    <input name="insuranceProvider" value={form.insuranceProvider} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Policy Number</label>
                    <input name="policyNumber" value={form.policyNumber} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Coverage Dates (from)</label>
                    <input name="coverageFrom" type="date" value={form.coverageFrom} onChange={handleChange} style={inputS} required />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                    <label style={labelStyle}>Coverage Dates (to)</label>
                    <input name="coverageTo" type="date" value={form.coverageTo} onChange={handleChange} style={inputS} required />
                </div>
            </div>
            {/* Financial Means */}
            <div style={sectionTitle}>Financial Means</div>
            <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>Who is covering your travel costs?</label>
                <select name="travelCostsBy" value={form.travelCostsBy} onChange={handleChange} style={inputS} required>
                    <option value="">Select</option>
                    <option value="self">Self</option>
                    <option value="sponsor">Sponsor</option>
                </select>
            </div>
            {form.travelCostsBy === 'sponsor' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 180 }}>
                        <label style={labelStyle}>Sponsor's Name</label>
                        <input name="sponsorName" value={form.sponsorName} onChange={handleChange} style={inputS} required={form.travelCostsBy === 'sponsor'} />
                    </div>
                    <div style={{ flex: 1, minWidth: 180 }}>
                        <label style={labelStyle}>Relationship to Sponsor</label>
                        <input name="sponsorRelationship" value={form.sponsorRelationship} onChange={handleChange} style={inputS} required={form.travelCostsBy === 'sponsor'} />
                    </div>
                    <div style={{ flex: 2, minWidth: 220 }}>
                        <label style={labelStyle}>Sponsor Info</label>
                        <input name="sponsorInfo" value={form.sponsorInfo} onChange={handleChange} style={inputS} required={form.travelCostsBy === 'sponsor'} />
                    </div>
                </div>
            )}
            {/* Additional Information */}
            <div style={sectionTitle}>Additional Information</div>
            <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>Have you ever been refused a visa to the Schengen area?</label>
                <select name="refusedVisa" value={form.refusedVisa} onChange={handleChange} style={inputS} required>
                    <option value="">Select</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>
            {form.refusedVisa === 'yes' && (
                <div style={{ marginBottom: 10 }}>
                    <label style={labelStyle}>If yes, provide details</label>
                    <textarea name="refusedVisaDetails" value={form.refusedVisaDetails} onChange={handleChange} style={{ ...inputS, minHeight: 60 }} required={form.refusedVisa === 'yes'} />
                </div>
            )}
            <div style={{ marginBottom: 10 }}>
                <label style={labelStyle}>Previous Schengen visa (last 5 years)?</label>
                <select name="previousVisa" value={form.previousVisa} onChange={handleChange} style={inputS} required>
                    <option value="">Select</option>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>
            {form.previousVisa === 'yes' && (
                <div style={{ marginBottom: 10 }}>
                    <label style={labelStyle}>If yes, specify dates and countries visited</label>
                    <textarea name="previousVisaDetails" value={form.previousVisaDetails} onChange={handleChange} style={{ ...inputS, minHeight: 60 }} required={form.previousVisa === 'yes'} />
                </div>
            )}
            {/* Confirmation Checkbox */}
            <div style={{ margin: '18px 0 18px 0', display: 'flex', alignItems: 'center', color: '#222' }}>
                <input type="checkbox" id="schengen-confirm" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} style={{ marginRight: 10 }} />
                <label htmlFor="schengen-confirm" style={{ fontSize: 15 }}>
                    I hereby confirm that the information provided above is accurate and complete to the best of my knowledge. I understand that this data will be used for the purpose of processing my Schengen visa application.
                </label>
            </div>
            <button type="submit" disabled={!allFieldsFilled || !confirmed} style={{ width: '100%', background: (!allFieldsFilled || !confirmed) ? '#b0bec5' : 'linear-gradient(90deg, #1976d2 0%, #00bcd4 100%)', color: '#fff', fontWeight: 700, fontSize: 18, border: 'none', borderRadius: 6, padding: '12px 0', cursor: (!allFieldsFilled || !confirmed) ? 'not-allowed' : 'pointer', marginTop: 8 }}>
                Submit
            </button>
            {submitted && (!allFieldsFilled || !confirmed) && (
                <div style={{ color: '#d32f2f', marginTop: 10, fontWeight: 600 }}>Please fill all fields and confirm before submitting.</div>
            )}
        </form>
    );
};