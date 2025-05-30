import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Contact } from '../../types';
import Card from '../UI/Card';

interface ContactSelectorProps {
  onSelectionChange: (selectedContacts: Contact[]) => void;
  onClose?: () => void;
}

const ContactSelector: React.FC<ContactSelectorProps> = ({ 
  onSelectionChange,
  onClose
}) => {
  const { contacts } = useAppContext();
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);

  const toggleContact = (contactId: string) => {
    setSelectedContactIds(prev => {
      const newSelection = prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId];
      
      // Update parent component with selected contacts
      const selectedContacts = contacts.filter(contact => 
        newSelection.includes(contact.id)
      );
      onSelectionChange(selectedContacts);
      
      return newSelection;
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-neutral-darkest">Select Contacts</h3>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-lighter"
            aria-label="Close"
          >
            <X size={20} className="text-neutral-dark" />
          </button>
        )}
      </div>
      
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {contacts.length === 0 ? (
          <p className="text-neutral-dark text-center py-4">
            No contacts found. Add contacts in the Contacts section.
          </p>
        ) : (
          contacts.map((contact) => (
            <Card 
              key={contact.id}
              onClick={() => toggleContact(contact.id)}
              className="cursor-pointer"
            >
              <div className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-neutral-dark">{contact.phone}</p>
                  <p className="text-xs text-neutral-medium">{contact.relation}</p>
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                  selectedContactIds.includes(contact.id)
                    ? 'bg-primary border-primary'
                    : 'border-neutral-light'
                }`}>
                  {selectedContactIds.includes(contact.id) && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactSelector;