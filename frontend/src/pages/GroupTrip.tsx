import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupTripInfo } from '../components/TripInfo';

const GroupTrip: React.FC = () => {
    //@ts-ignore
    const [imagesrc, setImagesrc] = useState<File | null | string>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [bulletpoints, setBulletpoints] = useState<string[]>(['']);
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [travelers, setTravelers] = useState(3);

    //@ts-ignore
    const handleBulletChange = (idx: number, value: string) => {
        setBulletpoints(bp => bp.map((b, i) => (i === idx ? value : b)));
    };
    const addBullet = (bp: Array<string>) => setBulletpoints(bp);
    //@ts-ignore
    const removeBullet = (idx: number) => setBulletpoints(bp => bp.filter((_, i) => i !== idx));

    //@ts-ignore
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setImagesrc(e.target.files[0]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic here
        alert('Form submitted!');
    };

    const { tripid } = useParams();

    const navigate = useNavigate()
    useEffect(() => {
        console.log(tripid);
        function confirmID() {
            console.log(tripid);
            let booking = () => {
                console.log(GroupTripInfo);
                for (let index = 0; index < GroupTripInfo.length; index++) {
                    const element = GroupTripInfo[index];
                    if (element.id == tripid) {
                        setTitle(element.title)
                        setDescription(element.description)
                        addBullet(element.bulletpoints)
                        setImagesrc(element.imagesrc)
                        setPrice(element.price)
                        setStartDate(element.startdate)
                        setDuration(element.duration)
                        setEndDate(element.enddate)
                        return [true, element];
                    }
                }
                return [false, {}]
            };
            if (!booking()[0]) {
                alert("Invalid Id");
                navigate("/trip");
            }
        }
        confirmID();
    }, [tripid]);

    return (
        <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '2.5rem 2vw' }}>
            <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, color: '#1976d2', marginBottom: '2rem' }}>Add Group Trip</h1>
            <form onSubmit={handleSubmit}>
                {/* <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, color: '#1976d2' }}>Image</label><br />
                    <input type="file" accept="image/*" disabled style={{ marginTop: 6, opacity: 0.6, cursor: 'not-allowed' }} />
                    {imagesrc && <div style={{ marginTop: 10 }}><img src={URL.createObjectURL(imagesrc)} alt="Preview" style={{ maxWidth: 180, borderRadius: 8 }} /></div>}
                </div> */}
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, color: '#1976d2' }}>Title</label><br />
                    <input type="text" value={title} disabled style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb', marginTop: 6, background: '#f5f5f5', color: '#888' }} />
                </div>
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, color: '#1976d2' }}>Description</label><br />
                    <textarea value={description} disabled style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb', marginTop: 6, minHeight: 70, background: '#f5f5f5', color: '#888' }} />
                </div>
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, color: '#1976d2' }}>Bullet Points</label>
                    {bulletpoints.map((bp, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', marginTop: 6 }}>
                            <input
                                type="text"
                                value={bp}
                                disabled
                                style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #bbb', background: '#f5f5f5', color: '#888' }}
                            />
                            <button type="button" disabled style={{ marginLeft: 8, background: '#eee', color: '#bbb', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'not-allowed', fontWeight: 700 }}>Remove</button>
                        </div>
                    ))}
                    <button type="button" disabled style={{ marginTop: 10, background: '#eee', color: '#bbb', border: 'none', borderRadius: 6, padding: '7px 16px', cursor: 'not-allowed', fontWeight: 700 }}>Add Bullet Point</button>
                </div>
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, color: '#1976d2' }}>Price</label><br />
                    <input type="text" value={price} disabled style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb', marginTop: 6, background: '#f5f5f5', color: '#888' }} />
                </div>
                <div style={{ marginBottom: 18 }}>
                    <label style={{ fontWeight: 600, color: '#1976d2' }}>Duration</label><br />
                    <input type="text" value={duration} disabled style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb', marginTop: 6, background: '#f5f5f5', color: '#888' }} />
                </div>
                <div style={{ marginBottom: 18, display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, color: '#1976d2' }}>Start Date</label><br />
                        <input type="date" value={startDate} disabled style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb', marginTop: 6, background: '#f5f5f5', color: '#888' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, color: '#1976d2' }}>End Date</label><br />
                        <input type="date" value={endDate} disabled style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb', marginTop: 6, background: '#f5f5f5', color: '#888' }} />
                    </div>
                </div>
                <div style={{ marginBottom: 28 }}>
                    <label style={{ fontWeight: 600, color: '#1976d2' }}>Number of Travelers</label><br />
                    <input type="number" min={1} value={travelers} onChange={e => setTravelers(Number(e.target.value))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bbb', marginTop: 6 }} required />
                </div>
                <button type="submit" style={{ width: '100%', background: 'linear-gradient(90deg, #1976d2 60%, #ff7043 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '1px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(30,34,45,0.08)' }}>Submit</button>
            </form>
        </div>
    );
};

export default GroupTrip;