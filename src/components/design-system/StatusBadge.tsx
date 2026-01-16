import React from 'react';

interface StatusBadgeProps {
  status: 'skade-meldt' | 'befaring-planlagt' | 'dokumentasjon-sendt' | 'godkjenning-fra-forsikring' | 'reparasjon-starter' | 'torking-pagar' | 'gjenoppbygging' | 'ferdigstillelse' | 'active' | 'pending' | 'completed' | 'cancelled' | 'in-progress' | 'approved' | 'rejected';
  children?: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusConfig = {
    'skade-meldt': {
      bg: 'bg-[#fdf5d9]',
      text: 'text-[#946800]',
      label: 'Skade meldt'
    },
    'befaring-planlagt': {
      bg: 'bg-[#fff1d7]',
      text: 'text-[#c45900]',
      label: 'Befaring planlagt'
    },
    'dokumentasjon-sendt': {
      bg: 'bg-[#d0e2ff]',
      text: 'text-[#0062ff]',
      label: 'Dokumentasjon sendt'
    },
    'godkjenning-fra-forsikring': {
      bg: 'bg-[#fdf5d9]',
      text: 'text-[#946800]',
      label: 'Godkjenning fra forsikring'
    },
    'reparasjon-starter': {
      bg: 'bg-[#d0e2ff]',
      text: 'text-[#0062ff]',
      label: 'Reparasjon starter'
    },
    'torking-pagar': {
      bg: 'bg-[#d0e2ff]',
      text: 'text-[#0062ff]',
      label: 'Tørking pågår'
    },
    'gjenoppbygging': {
      bg: 'bg-[#d0e2ff]',
      text: 'text-[#0062ff]',
      label: 'Gjenoppbygging'
    },
    'ferdigstillelse': {
      bg: 'bg-[#d1f4db]',
      text: 'text-[#24a148]',
      label: 'Ferdigstillelse'
    },
    'active': {
      bg: 'bg-[#d1f4db]',
      text: 'text-[#24a148]',
      label: 'Aktiv'
    },
    'pending': {
      bg: 'bg-[#fdf5d9]',
      text: 'text-[#946800]',
      label: 'Venter'
    },
    'completed': {
      bg: 'bg-[#d1f4db]',
      text: 'text-[#24a148]',
      label: 'Fullført'
    },
    'cancelled': {
      bg: 'bg-[#ffd7d9]',
      text: 'text-[#da1e28]',
      label: 'Kansellert'
    },
    'in-progress': {
      bg: 'bg-[#d0e2ff]',
      text: 'text-[#0062ff]',
      label: 'Pågår'
    },
    'approved': {
      bg: 'bg-[#d1f4db]',
      text: 'text-[#24a148]',
      label: 'Godkjent'
    },
    'rejected': {
      bg: 'bg-[#ffd7d9]',
      text: 'text-[#da1e28]',
      label: 'Avvist'
    }
  };
  
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full ${config.bg} ${config.text}`}>
      {children || config.label}
    </span>
  );
}