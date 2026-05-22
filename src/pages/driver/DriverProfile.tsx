import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Truck, MapPin, LogOut, Edit2, Check, X } from 'lucide-react';
import axios from 'axios';

export default function DriverProfile() {
  const { user, token, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put('/api/auth/profile', {
        name, phone
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      updateUser(res.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <header style={{ padding: '2rem 1.5rem', backgroundColor: 'var(--role-driver)', color: '#fff', textAlign: 'center', position: 'relative' }}>
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            <Edit2 size={24} />
          </button>
        ) : (
           <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => { setIsEditing(false); setName(user?.name || ''); setPhone(user?.phone || ''); }}
                style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
              <button 
                onClick={handleSave}
                disabled={isLoading}
                style={{ background: 'none', border: 'none', color: '#86efac', cursor: 'pointer', opacity: isLoading ? 0.5 : 1 }}
              >
                <Check size={24} />
              </button>
           </div>
        )}

        <div style={{ 
          width: '5rem', height: '5rem', borderRadius: '50%', 
          backgroundColor: '#fff', color: 'var(--role-driver)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2rem', fontWeight: 800, border: '4px solid rgba(255,255,255,0.2)',
          margin: '0 auto 1rem'
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        
        {isEditing ? (
          <input 
             type="text" 
             value={name} 
             onChange={(e) => setName(e.target.value)}
             style={{ fontSize: '1.25rem', fontWeight: 700, background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '4px', textAlign: 'center', padding: '0.25rem', width: '80%', marginBottom: '0.5rem', outline: 'none' }}
          />
        ) : (
          <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{user?.name}</div>
        )}
        
        <div style={{ opacity: 0.9, fontSize: '0.875rem' }}>Pengemudi Armada (Driver)</div>
      </header>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, marginTop: '-1.5rem' }}>
        <Card variant="elevated" padding="md" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#e0f2fe', color: 'var(--role-driver)', borderRadius: 'var(--radius-full)' }}>
              <Truck size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Kendaraan Armada</div>
              <div style={{ fontWeight: 700 }}>Pickup Bak L300 (L 1234 AB)</div>
            </div>
          </div>
          
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', backgroundColor: '#e0f2fe', color: 'var(--role-driver)', borderRadius: 'var(--radius-full)' }}>
              <MapPin size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>No. HP</div>
              {isEditing ? (
                 <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ fontWeight: 700, padding: '0.25rem', width: '100%', border: '1px solid #cbd5e1', borderRadius: '4px', outline: 'none' }}
                 />
              ) : (
                 <div style={{ fontWeight: 700 }}>{user?.phone || 'Belum diatur'}</div>
              )}
            </div>
          </div>
        </Card>

        <section style={{ marginTop: 'auto' }}>
          <Button variant="danger" ghost fullWidth icon={LogOut} onClick={logout} size="lg">
            Keluar / Sign Out
          </Button>
        </section>
      </div>
    </div>
  );
}
