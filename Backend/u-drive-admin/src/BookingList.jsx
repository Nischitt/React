import React from 'react';
import { 
    List, 
    Datagrid, 
    TextField, 
    NumberField, 
    DateField, 
    DeleteButton,
    ChipField,
    useRecordContext // 1. Added this missing import
} from 'react-admin';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Button from '@mui/material/Button';
import { API_URL } from './config';

// Custom Row Button Component
export const CertificateDownloadButton = () => {
    const record = useRecordContext();
    if (!record) return null;

    // Optional Safety: Only allow download if status is Approved/Success
    const isEligible = record.status === 'Approved' || record.status === 'Success!';
    if (!isEligible) {
        return <span style={{ color: '#6b7280', fontSize: '0.75rem', paddingLeft: '8px' }}>Pending Completion</span>;
    }

    // Handles fallback between MongoDB ._id and mapped React-Admin .id
    const recordId = record.id || record._id;
    const downloadUrl = `${API_URL}/api/bookings/${recordId}/certificate`;

    return (
        <Button 
            href={downloadUrl} 
            startIcon={<FileDownloadIcon />} 
            size="small"
            style={{ color: '#f59e0b', fontWeight: 'bold' }}
        >
            Certificate
        </Button>
    );
};

// Booking List Component
export const BookingList = (props) => (
    <List {...props} title="Incoming Student Bookings" sort={{ field: 'bookingDate', order: 'DESC' }}>
        <Datagrid bulkActionButtons={false}>
            <TextField source="studentName" label="Student Name" />
            <TextField source="studentEmail" label="Email" />
            <TextField source="studentPhone" label="Phone" />
            <ChipField source="itemType" label="Type" />
            <TextField source="itemName" label="Course/Pkg Selected" />
            <NumberField 
                source="itemPrice" 
                label="Price" 
                options={{ style: 'currency', currency: 'NPR' }} // Changed 'Nrs' to standard 'NPR'
            />
            <DateField source="bookingDate" label="Applied On" showTime />
            <TextField source="status" label="Status" />
            
            {/* 2. Registered your certificate action column directly into the data matrix */}
            <CertificateDownloadButton label="Certificate Panel" />
            
            <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
    </List>
);