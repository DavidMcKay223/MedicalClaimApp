// Base Service interface that can be used by both claim types
export interface Service {
    dateFrom: string;
    dateTo: string;
    placeOfService: string;
    procedureCode: string;
    modifiers?: string[];
    units: number;
    diagnosisPointers: string[];
    charges: number;
    renderingProviderNpi?: string;
    renderingProviderOtherId?: string;
}

// Base claim interface
export interface BaseClaim {
    id: string;
    claimNumber: string;
    status: 'draft' | 'submitted' | 'processed' | 'rejected';
    dateCreated: string;
    dateModified: string;
    providerId: string;
    patientId: string;
}

// CMS-1500 specific fields
export interface CMS1500Claim extends BaseClaim {
    formType: 'CMS1500';
    insuredId?: string;
    patientMedicareId?: string;
    patientName: {
        lastName: string;
        firstName: string;
        middleInitial?: string;
    };
    patientBirthDate: string;
    patientSex: 'M' | 'F' | 'U';
    insuredName?: {
        lastName: string;
        firstName: string;
        middleInitial?: string;
    };
    patientAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        phone?: string;
    };
    patientRelationshipToInsured?: 'self' | 'spouse' | 'child' | 'other';
    insuredAddress?: {
        street: string;
        city: string;
        state: string;
        zip: string;
        phone?: string;
    };
    employmentRelated?: boolean;
    autoAccident?: {
        state?: string;
    };
    otherAccident?: boolean;
    insuredPolicyNumber?: string;
    insuredGroupNumber?: string;
    insuredBirthDate?: string;
    insuredSex?: 'M' | 'F' | 'U';
    insuredEmployerName?: string;
    insurancePlanName?: string;
    otherHealthBenefitPlan?: boolean;
    illnessDate?: string;
    similarIllnessDate?: string;
    unableToWorkDates?: {
        from: string;
        to: string;
    };
    referringProvider?: {
        name?: string;
        npi?: string;
        otherId?: string;
    };
    hospitalizationDates?: {
        from: string;
        to: string;
    };
    outsideLab?: {
        used: boolean;
        charges?: number;
    };
    diagnosisCodes: string[]; // ICD-10 codes
    services: Service[]; // Using the Service interface here
    federalTaxId?: string;
    patientAccountNumber?: string;
    acceptAssignment?: boolean;
    totalCharge: number;
    amountPaid?: number;
    balanceDue?: number;
    billingProvider: {
        name: string;
        address: {
            street: string;
            city: string;
            state: string;
            zip: string;
        };
        phone?: string;
        npi: string;
        otherId?: string;
    };
}

// UB04 specific fields
export interface UB04Claim extends BaseClaim {
    formType: 'UB04';
    provider: {
        name: string;
        address: {
            street: string;
            city: string;
            state: string;
            zip: string;
        };
        phone: string;
        npi: string;
        taxId: string;
    };
    payToProvider?: {
        name?: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            zip?: string;
        };
    };
    patientControlNumber: string;
    medicalRecordNumber?: string;
    typeOfBill: string;
    patientAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country?: string;
    };
    admissionInfo?: {
        date?: string;
        hour?: string;
        type?: string;
        source?: string;
    };
    dischargeInfo?: {
        hour?: string;
        status?: string;
    };
    conditionCodes?: string[];
    accidentState?: string;
    occurrenceCodes?: {
        code: string;
        date?: string;
    }[];
    occurrenceSpanCodes?: {
        code: string;
        fromDate?: string;
        toDate?: string;
    }[];
    valueCodes?: {
        code: string;
        amount?: number;
    }[];
    revenueCodes: {
        code: string;
        description?: string;
        hcpcsCode?: string;
        serviceDate?: string;
        units: number;
        totalCharge: number;
        nonCoveredCharge?: number;
    }[];
    payers: {
        name: string;
        healthPlanId?: string;
        releaseOfInfo?: boolean;
        assignmentOfBenefits?: boolean;
        priorPayments?: number;
        estimatedDue?: number;
    }[];
    icdVersion: 'ICD-10' | 'ICD-9';
    principalDiagnosis: string;
    otherDiagnoses?: string[];
    admitDiagnosis?: string;
    reasonForVisit?: string;
    drgCode?: string;
    externalCauseCode?: string;
    procedureCodes?: {
        code: string;
        date?: string;
    }[];
    attendingProvider?: {
        npi?: string;
        name?: string;
    };
    operatingProvider?: {
        npi?: string;
        name?: string;
    };
    otherProviders?: {
        type: string;
        npi?: string;
        name?: string;
    }[];
    remarks?: string;
}

export type Claim = CMS1500Claim | UB04Claim;
