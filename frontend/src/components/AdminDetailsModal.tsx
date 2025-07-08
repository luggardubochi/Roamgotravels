import React from 'react';

interface AdminDetailsModalProps {
  open: boolean;
  type: 'user' | 'trip' | 'visa' | 'contact';
  data: any;
  onClose: () => void;
  actions?: React.ReactNode;
}

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0, 51, 102, 0.35)',
  backdropFilter: 'blur(5px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  transition: 'background 0.2s',
};

const contentStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, var(--color-text-light) 80%, var(--color-neutral) 100%)',
  borderRadius: 28,
  maxWidth: 1100,
  width: '99vw',
  maxHeight: '80vh',
  minHeight: 0,
  overflowY: 'auto',
  padding: '2.2rem 2.5rem 1.5rem 2.5rem',
  boxShadow: '0 8px 40px 0 rgba(0,51,102,0.18)',
  position: 'relative',
  animation: 'fadeIn 0.22s',
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
};

const closeBtnStyle: React.CSSProperties = {
  position: 'absolute',
  top: 18,
  right: 18,
  background: 'rgba(255,255,255,0.8)',
  border: 'none',
  borderRadius: '50%',
  width: 44,
  height: 44,
  fontSize: 26,
  color: 'var(--color-text-muted)',
  cursor: 'pointer',
  fontWeight: 700,
  boxShadow: '0 2px 8px rgba(0,51,102,0.10)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.18s',
};

const headerStyle: React.CSSProperties = {
  fontSize: '2rem',
  fontWeight: 900,
  marginBottom: 28,
  letterSpacing: '0.5px',
  background: 'linear-gradient(90deg, var(--color-secondary) 60%, var(--color-accent) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textAlign: 'center',
};

const sectionHeaderStyle: React.CSSProperties = {
  fontWeight: 800,
  color: 'var(--color-accent)',
  margin: '22px 0 10px 0',
  fontSize: '1.18rem',
  letterSpacing: '0.2px',
  borderBottom: '1.5px solid var(--color-primary)',
  paddingBottom: 2,
};

const labelStyle: React.CSSProperties = {
  fontWeight: 600,
  color: 'var(--color-secondary)',
  marginBottom: 2,
  fontSize: '1.08rem',
  marginTop: 2,
};

const valueStyle: React.CSSProperties = {
  marginBottom: 12,
  color: 'var(--color-text-main)',
  fontSize: '1.12rem',
};

const footerStyle: React.CSSProperties = {
  marginTop: 32,
  display: 'flex',
  gap: 16,
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const twoColGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0 32px',
};

const oneColGrid: React.CSSProperties = {
  display: 'block',
};

const companionsListStyle: React.CSSProperties = {
  paddingLeft: 0,
  marginBottom: 12,
  listStyle: 'none',
};

const companionCardStyle: React.CSSProperties = {
  marginBottom: 12,
  background: 'linear-gradient(90deg, #f7f9fc 60%, #fff3e0 100%)',
  borderRadius: 10,
  padding: '10px 14px',
  boxShadow: '0 1px 6px rgba(30,34,45,0.06)',
};

const AdminDetailsModal: React.FC<AdminDetailsModalProps> = ({ open, type, data, onClose, actions }) => {
  if (!open) return null;

  let content;
  let header;
  const isWide = typeof window !== 'undefined' && window.innerWidth > 700;

  if (type === 'user') {
    header = <div style={headerStyle}>User Details</div>;
    content = (
      <div style={isWide ? twoColGrid : oneColGrid}>
        <div>
          <div style={labelStyle}>Name</div>
          <div style={valueStyle}>{data.first_name} {data.last_name}</div>
          <div style={labelStyle}>Email</div>
          <div style={valueStyle}>{data.email}</div>
          <div style={labelStyle}>Role</div>
          <div style={valueStyle}>{data.role}</div>
        </div>
        <div>
          <div style={labelStyle}>Status</div>
          <div style={valueStyle}>{data.is_active ? 'Active' : 'Inactive'}</div>
          <div style={labelStyle}>Joined</div>
          <div style={valueStyle}>{data.created_at}</div>
          <div style={labelStyle}>Last Login</div>
          <div style={valueStyle}>{data.last_login || 'Never'}</div>
        </div>
      </div>
    );
  } else if (type === 'trip') {
    header = <div style={{ ...headerStyle, background: 'linear-gradient(90deg, var(--color-accent) 60%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Trip Application Details</div>;
    content = (
      <>
        <div style={sectionHeaderStyle}>Personal Info</div>
        <div style={isWide ? twoColGrid : oneColGrid}>
          <div>
            <div style={labelStyle}>Full Name</div>
            <div style={valueStyle}>{data.personalinfo?.fullname}</div>
            <div style={labelStyle}>Phone</div>
            <div style={valueStyle}>{data.personalinfo?.phone}</div>
            <div style={labelStyle}>Email</div>
            <div style={valueStyle}>{data.personalinfo?.email}</div>
          </div>
          <div>
            <div style={labelStyle}>Nationality</div>
            <div style={valueStyle}>{data.personalinfo?.nationality}</div>
          </div>
        </div>

        <div style={sectionHeaderStyle}>Location</div>
        <div style={valueStyle}>{data.location?.suggestforme === 'yes' ? 'Auto-suggest' : `${data.location?.location1}, ${data.location?.location2}, ${data.location?.location3}`}</div>

        <div style={sectionHeaderStyle}>Hotel Preferences</div>
        <div style={valueStyle}>{Array.isArray(data.hotelprefs) ? data.hotelprefs.join(', ') : data.hotelprefs}</div>

        <div style={isWide ? twoColGrid : oneColGrid}>
          <div>
            <div style={labelStyle}>Duration</div>
            <div style={valueStyle}>{data.duration}</div>
            <div style={labelStyle}>Holiday Vibe</div>
            <div style={valueStyle}>{data.holidayvibe}</div>
            <div style={labelStyle}>Flight/Visa</div>
            <div style={valueStyle}>{Array.isArray(data.flightvisa) ? data.flightvisa.join(', ') : data.flightvisa}</div>
          </div>
          <div>
            <div style={labelStyle}>Package Type</div>
            <div style={valueStyle}>{data.packagetype}</div>
            <div style={labelStyle}>Budget</div>
            <div style={valueStyle}>{data.holidaybudgetcurrency}{data.holidaybudget}</div>
            <div style={labelStyle}>Additional Notes</div>
            <div style={valueStyle}>{data.additionalnotes}</div>
          </div>
        </div>

        <div style={sectionHeaderStyle}>Companions</div>
        {Array.isArray(data.companions) && data.companions.length > 0 ? (
          <ul style={companionsListStyle}>
            {data.companions.map((comp: any, idx: number) => (
              <li key={idx} style={companionCardStyle}>
                <div style={{ fontWeight: 600, color: 'var(--color-secondary)', fontSize: '1.08rem' }}>{comp.fullname}</div>
                <div style={{ fontSize: '0.99rem', color: '#333' }}>Relationship: {comp.relationship}</div>
                <div style={{ fontSize: '0.99rem', color: '#333' }}>Phone: {comp.phone}</div>
                <div style={{ fontSize: '0.99rem', color: '#333' }}>Email: {comp.email}</div>
                <div style={{ fontSize: '0.99rem', color: '#333' }}>DOB: {comp.dob}</div>
                <div style={{ fontSize: '0.99rem', color: '#333' }}>Address: {comp.address}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ color: '#888', fontSize: '0.98rem', marginBottom: 12 }}>No companions listed.</div>
        )}

        <div style={sectionHeaderStyle}>Emergency Contact</div>
        <div style={isWide ? twoColGrid : oneColGrid}>
          <div>
            <div style={labelStyle}>Full Name</div>
            <div style={valueStyle}>{data.emergencycontact?.fullname}</div>
          </div>
          <div>
            <div style={labelStyle}>Phone</div>
            <div style={valueStyle}>{data.emergencycontact?.phone}</div>
            <div style={labelStyle}>Email</div>
            <div style={valueStyle}>{data.emergencycontact?.email}</div>
          </div>
        </div>

        <div style={isWide ? twoColGrid : oneColGrid}>
          <div>
            <div style={labelStyle}>Status</div>
            <div style={valueStyle}>{data.status}</div>
          </div>
          <div>
            <div style={labelStyle}>Submitted At</div>
            <div style={valueStyle}>{data.submittedat}</div>
          </div>
        </div>
      </>
    );
  } else if (type === 'visa') {
    header = <div style={{ ...headerStyle, background: 'linear-gradient(90deg, var(--color-primary) 60%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Visa Application Details</div>;
    content = (
      <>
        <div style={sectionHeaderStyle}>Personal Info</div>
        <div style={isWide ? twoColGrid : oneColGrid}>
          <div>
            <div style={labelStyle}>Full Name</div>
            <div style={valueStyle}>{data.personalInfo?.fullName}</div>
            <div style={labelStyle}>Gender</div>
            <div style={valueStyle}>{data.personalInfo?.gender}</div>
            <div style={labelStyle}>Date of Birth</div>
            <div style={valueStyle}>{data.personalInfo?.dob}</div>
          </div>
          <div>
            <div style={labelStyle}>Nationality</div>
            <div style={valueStyle}>{data.personalInfo?.nationality}</div>
            <div style={labelStyle}>Passport Number</div>
            <div style={valueStyle}>{data.personalInfo?.passportNumber}</div>
          </div>
        </div>

        <div style={sectionHeaderStyle}>Contact Info</div>
        <div style={isWide ? twoColGrid : oneColGrid}>
          <div>
            <div style={labelStyle}>Full Name</div>
            <div style={valueStyle}>{data.contactInfo?.fullName || data.personalInfo?.fullName}</div>
            <div style={labelStyle}>Phone</div>
            <div style={valueStyle}>{data.contactInfo?.phone}</div>
          </div>
          <div>
            <div style={labelStyle}>Email</div>
            <div style={valueStyle}>{data.contactInfo?.email}</div>
            <div style={labelStyle}>Address</div>
            <div style={valueStyle}>{data.contactInfo?.address}</div>
          </div>
        </div>

        <div style={sectionHeaderStyle}>Travel Info</div>
        <div style={isWide ? twoColGrid : oneColGrid}>
          <div>
            <div style={labelStyle}>Purpose</div>
            <div style={valueStyle}>{data.travelInfo?.purpose}</div>
            <div style={labelStyle}>Member States</div>
            <div style={valueStyle}>{data.travelInfo?.memberStates}</div>
          </div>
          <div>
            <div style={labelStyle}>Arrival Date</div>
            <div style={valueStyle}>{data.travelInfo?.arrivalDate}</div>
            <div style={labelStyle}>Departure Date</div>
            <div style={valueStyle}>{data.travelInfo?.departureDate}</div>
          </div>
        </div>

        <div style={isWide ? twoColGrid : oneColGrid}>
          <div>
            <div style={labelStyle}>Status</div>
            <div style={valueStyle}>{data.status}</div>
          </div>
          <div>
            <div style={labelStyle}>Submitted At</div>
            <div style={valueStyle}>{data.submittedAt}</div>
          </div>
        </div>
      </>
    );
  } else if (type === 'contact') {
    header = <div style={{ ...headerStyle, background: 'linear-gradient(90deg, var(--color-primary) 60%, var(--color-secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Contact Submission Details</div>;
    content = (
      <>
        <div style={labelStyle}>Name</div>
        <div style={valueStyle}>{data.name}</div>
        <div style={labelStyle}>Email</div>
        <div style={valueStyle}>{data.email}</div>
        <div style={labelStyle}>Subject</div>
        <div style={valueStyle}>{data.subject}</div>
        <div style={labelStyle}>Message</div>
        <div style={valueStyle}>{data.message}</div>
        <div style={labelStyle}>Status</div>
        <div style={valueStyle}>{data.status}</div>
        <div style={labelStyle}>Submitted</div>
        <div style={valueStyle}>{data.submittedAt}</div>
      </>
    );
  }

  return (
    <div style={modalStyle} onClick={onClose}>
      <div style={contentStyle} onClick={e => e.stopPropagation()}>
        <button style={closeBtnStyle} onClick={onClose} aria-label="Close">&#10005;</button>
        {header}
        {content}
        {actions && <div style={footerStyle}>{actions}</div>}
      </div>
    </div>
  );
};

export default AdminDetailsModal; 