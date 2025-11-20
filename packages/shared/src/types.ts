// Job status types
export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Transcription job interface
export interface TranscriptionJob {
  id: string;
  youtubeUrl: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
  audioMetadata?: AudioMetadata;
  results?: TranscriptionResults;
  error?: string;
}

// Audio metadata
export interface AudioMetadata {
  title: string;
  duration: number;
  format: string;
  sampleRate: number;
  channels: number;
}

// Voice parts enum
export enum VoicePart {
  SOPRANO = 'soprano',
  ALTO = 'alto',
  TENOR = 'tenor',
  BASS = 'bass',
}

// Musical note representation
export interface MusicalNote {
  pitch: string;
  duration: number;
  startTime: number;
  endTime: number;
  solfaNotation: string;
  confidence: number;
}

// Voice part transcription
export interface VoicePartTranscription {
  part: VoicePart;
  notes: MusicalNote[];
  confidence: number;
}

// Complete transcription results
export interface TranscriptionResults {
  keySignature: string;
  timeSignature: string;
  tempo: number;
  voiceParts: VoicePartTranscription[];
  overallConfidence: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// Job creation request
export interface CreateJobRequest {
  youtubeUrl: string;
  options?: {
    targetKey?: string;
    separateVoices?: boolean;
    outputFormat?: 'pdf' | 'midi' | 'both';
  };
}

// Job creation response
export interface CreateJobResponse extends ApiResponse<TranscriptionJob> {}

// Job status response
export interface JobStatusResponse extends ApiResponse<TranscriptionJob> {}

// Utility functions
export const isValidJobStatus = (status: string): status is JobStatus => {
  return ['pending', 'processing', 'completed', 'failed'].includes(status);
};

export const isValidVoicePart = (part: string): part is VoicePart => {
  return Object.values(VoicePart).includes(part as VoicePart);
};
