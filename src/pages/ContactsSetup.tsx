import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, User, Phone, UserCircle, Trash2 } from 'lucide-react';
import PageContainer from '../components/Layout/PageContainer';
import AppHeader from '../components/Layout/AppHeader';
import BottomNavigation from '../components/Layout/BottomNavigation';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import { useAppContext } from '../context/AppContext';

const ContactsSetup: React.FC = () => {
  const { contacts, addContact, removeContact } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relation: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
    };
    
    if (!newContact.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!newContact.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(newContact.phone) && !/^\d{10}$/.test(newContact.phone)) {
      newErrors.phone = 'Enter a valid phone number (e.g., 555-123-4567)';
    }
    
    setErrors(newErrors);
    return !newErrors.name && !newErrors.phone;
  };
  
  const handleAddContact = () => {
    if (validateForm()) {
      addContact(newContact);
      setNewContact({ name: '', phone: '', relation: '' });
      setShowAddForm(false);
    }
  };
  
  const handleCancel = () => {
    setNewContact({ name: '', phone: '', relation: '' });
    setErrors({ name: '', phone: '' });
    setShowAddForm(false);
  };

  return (
    <PageContainer>
      <AppHeader title="Emergency Contacts" />
      
      <div className="max-w-md mx-auto pb-20">
        <div className="mb-4">
          <p className="text-neutral-darker mb-6">
            Add trusted contacts who should be notified in case of an emergency.
          </p>
          
          {contacts.length === 0 && !showAddForm && (
            <div className="text-center py-8">
              <UserCircle size={48} className="text-neutral-light mx-auto mb-4" />
              <p className="text-neutral-dark mb-4">No contacts added yet</p>
              <Button onClick={() => setShowAddForm(true)}>Add Your First Contact</Button>
            </div>
          )}
        </div>
        
        {showAddForm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-4 mb-4">
              <h3 className="font-medium mb-4">Add New Contact</h3>
              
              <div className="space-y-4">
                <Input 
                  label="Name"
                  name="name"
                  value={newContact.name}
                  onChange={handleInputChange}
                  placeholder="Enter contact name"
                  leftIcon={<User size={16} className="text-neutral-medium" />}
                  error={errors.name}
                  fullWidth
                />
                
                <Input 
                  label="Phone Number"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleInputChange}
                  placeholder="e.g., 555-123-4567"
                  leftIcon={<Phone size={16} className="text-neutral-medium" />}
                  error={errors.phone}
                  fullWidth
                />
                
                <Input 
                  label="Relationship (Optional)"
                  name="relation"
                  value={newContact.relation}
                  onChange={handleInputChange}
                  placeholder="e.g., Family, Friend, Neighbor"
                  fullWidth
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="ghost" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleAddContact}>
                  Save Contact
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (
          contacts.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Your Contacts</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowAddForm(true)}
                  leftIcon={<Plus size={16} />}
                >
                  Add New
                </Button>
              </div>
              
              <motion.div className="space-y-3">
                {contacts.map((contact, index) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="p-3">
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-neutral-dark">{contact.phone}</p>
                          {contact.relation && (
                            <p className="text-xs text-neutral-medium">{contact.relation}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeContact(contact.id)}
                          className="p-2 text-neutral-medium hover:text-error transition-colors"
                          aria-label="Delete contact"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )
        )}
      </div>
      
      <BottomNavigation />
    </PageContainer>
  );
};

export default ContactsSetup;