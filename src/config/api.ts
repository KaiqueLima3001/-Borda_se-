const FIREBASE_PROJECT_ID = 'bordase-bd';

const FIREBASE_WEB_API_KEY = "AIzaSyCpUWSN9Igj0vneO-M8roJ2fiFcBBzuWXc";

export const FIRESTORE_PEDIDOS_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/pedidos`;

export const FIRESTORE_DADOS_CADASTRAIS_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/usuarios`;

export const FIREBASE_AUTH_RECOVERY_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${FIREBASE_WEB_API_KEY}`;

export const FIREBASE_AUTH_SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_WEB_API_KEY}`;