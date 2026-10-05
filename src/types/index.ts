export type Language = 'es' | 'en';

export type Currency = 'USD' | 'DOP' | 'EUR';

export interface MarketAsset {
  id: string;
  name: string;
  symbol: string;
  category: 'currency' | 'market' | 'commodity' | 'crypto' | 'dominican';
  price: number;
  change24h: number;
  currency: string;
  sparkline: number[];
  high24h?: number;
  low24h?: number;
  description: string;
  nexaInsight: string;
}

export interface MortgageCalculationInput {
  propertyPrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  currency: 'USD' | 'DOP';
  monthlyIncome: number;
}

export interface MortgageCalculationResult {
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  recommendedIncome: number;
  estimatedDti: number;
}

export interface DtiInput {
  monthlyIncome: number;
  mortgageRent: number;
  autoLoans: number;
  creditCardsMin: number;
  otherLoans: number;
}

export interface DtiResult {
  totalDebt: number;
  dtiPercentage: number;
  status: 'healthy' | 'moderate' | 'high' | 'critical';
  maxAllowedLoanEstimate: number;
  recommendation: string;
}

export interface CapnexsScoreData {
  age: number;
  citizenship: string;
  residenceCountry: string;
  employmentType: string;
  monthlyIncomeUSD: number;
  totalLiquidSavingsUSD: number;
  monthlyDebtsUSD: number;
  targetPropertyUSD: number;
  downPaymentUSD: number;
}

export interface CapnexsScoreResult {
  score: number;
  tier: 'Exceptional' | 'Strong' | 'Favorable' | 'Moderate' | 'Limited' | 'High Risk';
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  breakdown: {
    financialCapacity: number;
    debtLevel: number;
    liquidity: number;
    initialCapital: number;
    riskProfile: number;
  };
  qualifiedLoanEstimateUSD: number;
  summaryFeedback: string;
}

export interface InvestmentInput {
  purchasePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  monthlyRentalIncome: number;
  occupancyRate: number; // percentage
  monthlyHOAExpenses: number;
  monthlyMaintenance: number;
  propertyTaxInsuranceYearly: number;
}

export interface InvestmentResult {
  downPaymentAmount: number;
  loanAmount: number;
  monthlyMortgage: number;
  effectiveMonthlyIncome: number;
  totalMonthlyExpenses: number;
  netMonthlyCashFlow: number;
  annualNetOperatingIncome: number;
  capRate: number;
  cashOnCashReturn: number;
  breakEvenMonths: number;
}

export interface AiAgent {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatarIcon: string;
  description: string;
  presetQueries: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'nexa' | 'agent';
  agentId?: string;
  agentName?: string;
  content: string;
  timestamp: string;
  calculationSnippet?: {
    label: string;
    value: string;
    sublabel?: string;
  }[];
}
