import React from 'react';
import { STATUS_CONFIG } from '../../utils/priorityUtils';

export function TaskStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG['A FAZER'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.badgeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} aria-hidden="true" />
      {config.label}
    </span>
  );
}

export default TaskStatusBadge;
