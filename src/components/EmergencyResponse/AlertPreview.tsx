import React from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import { EmergencyAlert, Contact } from '../../types';

interface AlertPreviewProps {
  alert: EmergencyAlert;
  className?: string;
}

const AlertPreview: React.FC<AlertPreviewProps> = ({ alert, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="flex items-start space-x-3 mb-4">
        <AlertTriangle className="text-error-dark mt-1 flex-shrink-0" size={20} />
        <div>
          <h3 className="font-semibold text-neutral-darkest">Emergency Alert</h3>
          <p className="text-sm text-neutral-dark">
            {new Date(alert.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-neutral-darkest">{alert.message}</p>
      </div>
      
      <div className="flex items-start space-x-2 mb-4">
        <MapPin className="text-primary-dark mt-1 flex-shrink-0" size={18} />
        <div>
          <p className="text-sm font-medium">Location</p>
          <p className="text-xs text-neutral-dark">
            {alert.location.address || `${alert.location.latitude}, ${alert.location.longitude}`}
          </p>
        </div>
      </div>
      
      <div className="border-t border-neutral-lighter pt-3">
        <p className="text-sm font-medium mb-2">
          {alert.contacts.length === 0
            ? 'No contacts selected'
            : alert.contacts.length === 1
            ? '1 contact selected'
            : `${alert.contacts.length} contacts selected`}
        </p>
        {alert.contacts.length > 0 && (
          <div className="space-y-2 max-h-24 overflow-y-auto">
            {alert.contacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ContactItem: React.FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <div className="text-xs bg-neutral-lightest rounded-md p-2 flex justify-between">
      <div>
        <p className="font-medium">{contact.name}</p>
        <p className="text-neutral-dark">{contact.relation}</p>
      </div>
      <p className="text-neutral-dark">{contact.phone}</p>
    </div>
  );
};

export default AlertPreview;