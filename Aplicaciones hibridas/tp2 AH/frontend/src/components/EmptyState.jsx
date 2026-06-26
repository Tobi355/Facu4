import React from 'react';
import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';

const EmptyState = ({ icon: Icon = Inbox, title, description, action }) => (
  <motion.div
    className="text-center py-5"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="empty-state-icon mb-3">
      <Icon size={48} />
    </div>
    <h5 className="fw-semibold mb-2">{title}</h5>
    {description && <p className="text-muted mb-3">{description}</p>}
    {action && action}
  </motion.div>
);

export default EmptyState;
