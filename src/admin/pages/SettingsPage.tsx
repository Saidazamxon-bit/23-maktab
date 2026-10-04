import React, { useState } from 'react'
import { AdminLayout } from '../layout/AdminLayout'
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Save } from 'lucide-react'

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    schoolName: '23-MAKTAB',
    schoolTagline: 'Bilim, tarbiya va katta imkoniyatlar maktabi.',
    phone: '+998 (71) 200-00-00',
    email: 'info@school.edu.uz',
    address: 'Tashkent, Uzbekistan',
    facebook: 'https://facebook.com/school23',
    instagram: 'https://instagram.com/school23',
    youtube: 'https://youtube.com/@school23',
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (field: string, value: string) => {
    setSettings({ ...settings, [field]: value })
    setSaved(false)
  }

  const handleSave = async () => {
    // Simulate saving to backend
    await new Promise((resolve) => setTimeout(resolve, 500))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <AdminLayout title="Settings" breadcrumbs={[{ label: 'Dashboard', href: '/admin' }, { label: 'Settings' }]}>
      <div className="admin-page">
        <div className="admin-settings">
          {/* School Information */}
          <div className="admin-settings-section">
            <h2>School Information</h2>
            <div className="admin-form-group">
              <label>School Name</label>
              <input
                type="text"
                value={settings.schoolName}
                onChange={(e) => handleChange('schoolName', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>School Tagline</label>
              <input
                type="text"
                value={settings.schoolTagline}
                onChange={(e) => handleChange('schoolTagline', e.target.value)}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="admin-settings-section">
            <h2>Contact Information</h2>
            <div className="admin-form-group">
              <label>
                <Phone size={18} />
                Phone
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>
                <Mail size={18} />
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>
                <MapPin size={18} />
                Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="admin-settings-section">
            <h2>Social Media</h2>
            <div className="admin-form-group">
              <label>
                <Facebook size={18} />
                Facebook
              </label>
              <input
                type="url"
                value={settings.facebook}
                onChange={(e) => handleChange('facebook', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>
                <Instagram size={18} />
                Instagram
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => handleChange('instagram', e.target.value)}
              />
            </div>
            <div className="admin-form-group">
              <label>
                <Youtube size={18} />
                YouTube
              </label>
              <input
                type="url"
                value={settings.youtube}
                onChange={(e) => handleChange('youtube', e.target.value)}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="admin-settings-actions">
            {saved && (
              <div className="admin-alert admin-alert-success">
                ✓ Settings saved successfully
              </div>
            )}
            <button onClick={handleSave} className="admin-button admin-button-primary">
              <Save size={18} />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
