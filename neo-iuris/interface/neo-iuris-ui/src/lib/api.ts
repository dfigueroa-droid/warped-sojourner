const API_URL = 'http://localhost:8000/api';

export async function fetchSystemStatus() {
    try {
        const res = await fetch('http://localhost:8000/');
        return await res.json();
    } catch (error) {
        return { status: 'OFFLINE', system: 'Unreachable' };
    }
}

export async function validateTransparency(procedureName: string) {
    try {
        const res = await fetch(`${API_URL}/transparency/validate?name=${encodeURIComponent(procedureName)}`);
        return await res.json();
    } catch (error) {
        console.error('Transparency Check Failed', error);
        return null;
    }
}

export async function submitRegulatoryAviso(data: any) {
    const res = await fetch(`${API_URL}/regulatory/submit-aviso`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_URL}/repo/upload`, {
        method: 'POST',
        body: formData
    });
    return await res.json();
}

export async function listFiles(category?: string) {
    const url = category ? `${API_URL}/repo/files?category=${category}` : `${API_URL}/repo/files`;
    const res = await fetch(url);
    return await res.json();
}

export async function generateForensicReport(data: any) {
    const res = await fetch(`${API_URL}/forensic/generate-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
}

export async function auditIso(data: any) {
    const res = await fetch(`${API_URL}/engineering/iso-audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await res.json();
}
