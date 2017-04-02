import { HOST, PORT, ENV } from './env';

// General
export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

// Base URL
export const baseURL = `http://${HOST}:${PORT}`;

// Google Analytics
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;
