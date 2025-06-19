import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import axios from '../assets/js/api/getUser';
import { RiBuilding4Line, RiMapPinLine, RiTimeLine, RiCalendarTodoLine, RiCloseLine, RiUploadCloud2Line, RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';

// Keyframes for animations
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const slideUp = keyframes`from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; }`;

// Styled Components
const JobBoardContainer = styled.div`
  flex: 1;
  padding: 24px 48px;
  background-color: #f9fafb;
  height: 100%;
  overflow-y: auto;
  animation: ${fadeIn} 0.5s ease-out;
  margin-left: ${props => props.$isSidebarToggled ? '75px' : '250px'};
  transition: margin-left 0.3s ease-out;
`;

const Header = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 24px;
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
`;

const JobCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  animation: ${slideUp} 0.4s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const JobTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
`;

const CompanyName = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #4b5563;
  margin-bottom: 16px;

  svg {
    margin-right: 8px;
    color: #9ca3af;
  }
`;

const JobInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #4b5563;
  margin-bottom: 8px;

  svg {
    margin-right: 8px;
    color: #9ca3af;
  }
`;

const JobDescription = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.5;
  margin-top: 16px;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ApplyButton = styled.button`
  background-color: ${props => (props.disabled ? '#d1d5db' : '#2563eb')};
  color: white;
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => (props.disabled ? '#d1d5db' : '#1d4ed8')};
  }
`;

const StatusBadge = styled.span`
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  
  ${({ status }) => {
    switch (status) {
      case 'pending':
        return `background-color: #fef3c7; color: #92400e;`;
      case 'approved':
      case 'accepted':
        return `background-color: #d1fae5; color: #065f46;`;
      case 'rejected':
        return `background-color: #fee2e2; color: #991b1b;`;
      default:
        return `background-color: #e5e7eb; color: #4b5563;`;
    }
  }}
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 32px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: ${slideUp} 0.4s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  &:hover { color: #1f2937; }
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: #374151;
`;

const FileInputLabel = styled(Label)`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover { border-color: #2563eb; }

  svg { margin: 0 auto 8px auto; }
`;

const FileInput = styled.input`
  display: none;
`;

const FileName = styled.div`
  margin-top: 12px;
  font-style: italic;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: center;

  svg { margin-right: 8px; color: #22c55e; }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
  justify-content: flex-end;
`;

const CancelButton = styled(ApplyButton)`
  background-color: #e5e7eb;
  color: #374151;
  &:hover { background-color: #d1d5db; }
`;

const Alert = styled.p`
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  svg { margin-right: 8px; }

  ${({ type }) => type === 'error' 
    ? `background-color: #fee2e2; color: #b91c1c;`
    : `background-color: #d1fae5; color: #047857;`
  }
`;

const StudentJobBoard = () => {
  const isSidebarToggled = useSelector(state => state.toggle);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [applyStatus, setApplyStatus] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [applyError, setApplyError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/job-postings');
        const activeJobs = response.data.filter(j => j.status === 'active');
        setJobs(activeJobs);

        const statuses = {};
        activeJobs.forEach(job => {
          if (job.application_status) {
            statuses[job.id] = job.application_status;
          }
        });
        setApplyStatus(statuses);

      } catch (err) {
        setError('Failed to fetch job postings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const openApplyModal = (job) => {
    setSelectedJob(job);
    setResume(null);
    setCoverLetter(null);
    setSuccessMsg('');
    setApplyError('');
    setShowModal(true);
  };

  const closeApplyModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setApplyError('');
    setSuccessMsg('');
    if (!resume) {
      setApplyError('Resume is required.');
      return;
    }
    const formData = new FormData();
    formData.append('job_posting_id', selectedJob.id);
    formData.append('resume', resume);
    if (coverLetter) formData.append('cover_letter', coverLetter);
    try {
      await axios.post('/api/applications', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setApplyStatus(prev => ({ ...prev, [selectedJob.id]: 'pending' }));
      setSuccessMsg('Application submitted successfully!');
      setTimeout(() => closeApplyModal(), 2000);
    } catch (err) {
      setApplyError(err.response?.data?.message || 'Failed to apply.');
    }
  };

  return (
    <JobBoardContainer $isSidebarToggled={isSidebarToggled}>
      <Header>Job Opportunities</Header>
      {loading ? <p>Loading...</p> : error ? <Alert type="error">{error}</Alert> : (
        <JobGrid>
          {jobs.map(job => {
            const status = applyStatus[job.id];
            return (
              <JobCard key={job.id}>
                <JobTitle>{job.title}</JobTitle>
                <CompanyName><RiBuilding4Line size={16} />{job.company_name || 'N/A'}</CompanyName>
                <JobInfo><RiMapPinLine size={16} />{job.location}</JobInfo>
                <JobInfo><RiTimeLine size={16} />{job.type}</JobInfo>
                <JobInfo><RiCalendarTodoLine size={16} />Deadline: {new Date(job.application_deadline).toLocaleDateString()}</JobInfo>
                <JobDescription>{job.description}</JobDescription>
                <CardFooter>
                  <ApplyButton onClick={() => openApplyModal(job)} disabled={!!status}>
                    {status ? 'Applied' : 'Apply Now'}
                  </ApplyButton>
                  {status && <StatusBadge status={status}>{status === 'pending' ? 'In Review' : status}</StatusBadge>}
                </CardFooter>
              </JobCard>
            );
          })}
        </JobGrid>
      )}
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={closeApplyModal}><RiCloseLine size={24} /></CloseButton>
            <ModalTitle>Apply to: {selectedJob?.title}</ModalTitle>
            <form onSubmit={handleApply}>
              {applyError && <Alert type="error"><RiErrorWarningFill />{applyError}</Alert>}
              {successMsg && <Alert type="success"><RiCheckboxCircleFill />{successMsg}</Alert>}
              {!successMsg && (
                <>
                  <FormGroup>
                    <FileInputLabel htmlFor="resume-upload">
                      <RiUploadCloud2Line size={32} />
                      <div>Click to upload Resume (PDF)</div>
                    </FileInputLabel>
                    <FileInput id="resume-upload" type="file" accept="application/pdf" required onChange={e => setResume(e.target.files[0])} />
                    {resume && <FileName><RiCheckboxCircleFill />{resume.name}</FileName>}
                  </FormGroup>
                  <FormGroup>
                    <FileInputLabel htmlFor="cover-letter-upload">
                      <RiUploadCloud2Line size={32} />
                      <div>Click to upload Cover Letter (Optional)</div>
                    </FileInputLabel>
                    <FileInput id="cover-letter-upload" type="file" accept="application/pdf" onChange={e => setCoverLetter(e.target.files[0])} />
                    {coverLetter && <FileName><RiCheckboxCircleFill />{coverLetter.name}</FileName>}
                  </FormGroup>
                  <ModalActions>
                    <CancelButton type="button" onClick={closeApplyModal}>Cancel</CancelButton>
                    <ApplyButton type="submit">Submit Application</ApplyButton>
                  </ModalActions>
                </>
              )}
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </JobBoardContainer>
  );
};

export default StudentJobBoard; 