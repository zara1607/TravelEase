// /src/pages/TravelInsurance.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Heart, Briefcase, Plane, Hotel, Car,
  Clock, CheckCircle, XCircle, AlertCircle, FileText,
  Download, Upload, Search, Filter, ChevronRight,
  ChevronLeft, Plus, Eye, Edit, Trash2, RefreshCw,
  Bell, BellOff, Star, Award, TrendingUp, DollarSign,
  Users, Calendar, MapPin, Phone, Mail, MessageSquare,
  CreditCard, Wallet, Home, Umbrella, Wind,
  Thermometer, Droplets, Zap, X
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { toast } from 'react-hot-toast';

// Move all mock data outside the component and export it
export const mockPlans = [
  {
    id: 'basic',
    name: 'Basic Travel Shield',
    price: 499,
    currency: 'INR',
    coverage: {
      medical: 50000,
      cancellation: 25000,
      baggage: 10000,
      delay: 5000,
      accident: 100000
    },
    benefits: [
      'Emergency Medical Coverage',
      'Trip Cancellation',
      'Baggage Loss',
      'Flight Delay (4+ hours)',
      '24/7 Emergency Assistance'
    ],
    exclusions: [
      'Pre-existing conditions',
      'Adventure sports',
      'Intentional acts'
    ],
    popularity: 85,
    rating: 4.5,
    reviews: 1245,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'premium',
    name: 'Premium Travel Guard',
    price: 999,
    currency: 'INR',
    coverage: {
      medical: 200000,
      cancellation: 100000,
      baggage: 25000,
      delay: 10000,
      accident: 500000
    },
    benefits: [
      'Enhanced Medical Coverage',
      'Trip Cancellation & Interruption',
      'Baggage & Personal Effects',
      'Flight Delay (2+ hours)',
      'Emergency Evacuation',
      'Adventure Sports Coverage',
      'Personal Liability'
    ],
    exclusions: [
      'Pre-existing conditions with waiver available'
    ],
    popularity: 92,
    rating: 4.8,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'family',
    name: 'Family Travel Protect',
    price: 1799,
    currency: 'INR',
    coverage: {
      medical: 300000,
      cancellation: 150000,
      baggage: 30000,
      delay: 15000,
      accident: 1000000
    },
    benefits: [
      'Covers up to 4 family members',
      'Comprehensive Medical Coverage',
      'Trip Cancellation & Interruption',
      'Baggage & Personal Effects',
      'Flight Delay (2+ hours)',
      'Emergency Evacuation',
      'Adventure Sports Coverage',
      'Personal Liability',
      'Child Care Benefits'
    ],
    exclusions: [
      'Pre-existing conditions with waiver available'
    ],
    popularity: 88,
    rating: 4.7,
    reviews: 654,
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'annual',
    name: 'Annual Multi-Trip',
    price: 3499,
    currency: 'INR',
    coverage: {
      medical: 250000,
      cancellation: 75000,
      baggage: 20000,
      delay: 10000,
      accident: 500000
    },
    benefits: [
      'Unlimited trips per year',
      'Coverage up to 30 days per trip',
      'Comprehensive Medical Coverage',
      'Trip Cancellation & Interruption',
      'Baggage & Personal Effects',
      'Flight Delay (2+ hours)',
      'Emergency Evacuation',
      'Personal Liability'
    ],
    exclusions: [
      'Pre-existing conditions',
      'Maximum 30 days per trip'
    ],
    popularity: 78,
    rating: 4.6,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1174&q=80'
  }
];

export const mockPolicies = [
  {
    id: 'POL001',
    planId: 'premium',
    planName: 'Premium Travel Guard',
    policyNumber: 'IN-2024-12345',
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2024-04-01',
    premium: 999,
    coverage: {
      medical: 200000,
      cancellation: 100000,
      baggage: 25000,
      delay: 10000,
      accident: 500000
    },
    insured: [
      { name: 'John Doe', age: 32, relation: 'Self' }
    ],
    beneficiaries: [
      { name: 'Jane Doe', relation: 'Spouse' }
    ]
  },
  {
    id: 'POL002',
    planId: 'family',
    planName: 'Family Travel Protect',
    policyNumber: 'IN-2024-67890',
    status: 'active',
    startDate: '2024-02-15',
    endDate: '2024-02-22',
    premium: 1799,
    coverage: {
      medical: 300000,
      cancellation: 150000,
      baggage: 30000,
      delay: 15000,
      accident: 1000000
    },
    insured: [
      { name: 'John Doe', age: 32, relation: 'Self' },
      { name: 'Jane Doe', age: 30, relation: 'Spouse' },
      { name: 'Master Doe', age: 8, relation: 'Child' }
    ],
    beneficiaries: []
  }
];

export const mockClaims = [
  {
    id: 'CLM001',
    policyId: 'POL002',
    type: 'Medical Emergency',
    amount: 15000,
    status: 'processing',
    date: '2024-02-18',
    description: 'Emergency medical treatment for food poisoning',
    documents: ['medical-report.pdf', 'hospital-bill.pdf'],
    trackingSteps: [
      { step: 'Claim Submitted', date: '2024-02-18', status: 'completed' },
      { step: 'Document Verification', date: '2024-02-19', status: 'completed' },
      { step: 'Claim Assessment', date: null, status: 'pending' },
      { step: 'Payment Processing', date: null, status: 'pending' }
    ]
  },
  {
    id: 'CLM002',
    policyId: 'POL001',
    type: 'Flight Delay',
    amount: 5000,
    status: 'approved',
    date: '2024-03-05',
    approvedDate: '2024-03-10',
    description: 'Flight delayed by 6 hours',
    documents: ['boarding-pass.pdf', 'delay-certificate.pdf'],
    trackingSteps: [
      { step: 'Claim Submitted', date: '2024-03-05', status: 'completed' },
      { step: 'Document Verification', date: '2024-03-06', status: 'completed' },
      { step: 'Claim Assessment', date: '2024-03-08', status: 'completed' },
      { step: 'Payment Processed', date: '2024-03-10', status: 'completed' }
    ]
  }
];

const TravelInsurance = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('plans');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  // Use the exported mock data
  const [plans, setPlans] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPlans(mockPlans);
      setPolicies(mockPolicies);
      setClaims(mockClaims);
    } catch (error) {
      console.error('Error fetching insurance data:', error);
      toast.error('Failed to load insurance data');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'plans', label: 'Insurance Plans', icon: Shield },
    { id: 'policies', label: 'My Policies', icon: FileText },
    { id: 'claims', label: 'Claims', icon: Heart },
    { id: 'coverage', label: 'Coverage Details', icon: Award },
    { id: 'benefits', label: 'Benefits', icon: Star }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'success', label: 'Active', icon: CheckCircle },
      expired: { variant: 'secondary', label: 'Expired', icon: Clock },
      processing: { variant: 'warning', label: 'Processing', icon: Clock },
      approved: { variant: 'success', label: 'Approved', icon: CheckCircle },
      rejected: { variant: 'danger', label: 'Rejected', icon: XCircle }
    };
    return variants[status] || variants.processing;
  };

  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    setShowPlanModal(true);
  };

  const handleFileClaim = (policy) => {
    setSelectedPlan(policy);
    setShowClaimModal(true);
  };

  const handleTrackClaim = (claim) => {
    setSelectedClaim(claim);
    setShowTrackingModal(true);
  };

  const handlePurchase = async (formData) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Insurance purchased successfully');
      setShowPlanModal(false);
    } catch (error) {
      toast.error('Purchase failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
            <div className="h-4 w-96 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Travel Insurance</h1>
          <p className="text-gray-600 mt-2">
            Protect your journey with comprehensive travel insurance plans
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Policies</p>
                <p className="text-3xl font-bold text-gray-900">2</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Coverage</p>
                <p className="text-3xl font-bold text-green-600">₹4.5L</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Claims Filed</p>
                <p className="text-3xl font-bold text-yellow-600">2</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-xl">
                <Heart className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved Claims</p>
                <p className="text-3xl font-bold text-purple-600">1</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search insurance plans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans
                .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((plan) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <p className="text-sm opacity-90">Starting at</p>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge variant="primary" className="bg-blue-600 text-white">
                          {plan.popularity}% Popular
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                          <span className="text-sm text-gray-500">/trip</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{plan.rating}</span>
                          <span className="text-xs text-gray-500">({plan.reviews})</span>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Medical Coverage</span>
                          <span className="font-semibold">₹{plan.coverage.medical.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Trip Cancellation</span>
                          <span className="font-semibold">₹{plan.coverage.cancellation.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Baggage Loss</span>
                          <span className="font-semibold">₹{plan.coverage.baggage.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {plan.benefits.slice(0, 3).map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                        {plan.benefits.length > 3 && (
                          <p className="text-xs text-blue-600">+{plan.benefits.length - 3} more benefits</p>
                        )}
                      </div>

                      <Button
                        variant="primary"
                        fullWidth
                        onClick={() => handleBuyNow(plan)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="space-y-4">
            {policies.map((policy) => {
              const statusBadge = getStatusBadge(policy.status);
              const StatusIcon = statusBadge.icon;

              return (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-blue-50 rounded-xl">
                            <Shield className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{policy.planName}</h3>
                            <p className="text-sm text-gray-500">Policy: {policy.policyNumber}</p>
                          </div>
                        </div>
                        <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {statusBadge.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Valid From</p>
                          <p className="font-medium">{new Date(policy.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Valid To</p>
                          <p className="font-medium">{new Date(policy.endDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Premium</p>
                          <p className="font-medium">₹{policy.premium}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Insured</p>
                          <p className="font-medium">{policy.insured.length} {policy.insured.length === 1 ? 'person' : 'people'}</p>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleFileClaim(policy)}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          File Claim
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {policy.status === 'active' && (
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Claims Tab */}
        {activeTab === 'claims' && (
          <div className="space-y-4">
            {claims.map((claim) => {
              const statusBadge = getStatusBadge(claim.status);
              const StatusIcon = statusBadge.icon;

              return (
                <motion.div
                  key={claim.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 ${
                            claim.status === 'approved' ? 'bg-green-50' :
                            claim.status === 'rejected' ? 'bg-red-50' : 'bg-yellow-50'
                          } rounded-xl`}>
                            {claim.status === 'approved' ? (
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            ) : claim.status === 'rejected' ? (
                              <XCircle className="w-6 h-6 text-red-600" />
                            ) : (
                              <Clock className="w-6 h-6 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{claim.type} Claim</h3>
                            <p className="text-sm text-gray-500">Claim ID: {claim.id}</p>
                          </div>
                        </div>
                        <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {statusBadge.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Claim Amount</p>
                          <p className="font-medium">₹{claim.amount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Filed On</p>
                          <p className="font-medium">{new Date(claim.date).toLocaleDateString()}</p>
                        </div>
                        {claim.approvedDate && (
                          <div>
                            <p className="text-xs text-gray-500">Approved On</p>
                            <p className="font-medium">{new Date(claim.approvedDate).toLocaleDateString()}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-500">Documents</p>
                          <p className="font-medium">{claim.documents.length} files</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{claim.description}</p>

                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTrackClaim(claim)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Track Claim
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Documents
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Coverage Tab */}
        {activeTab === 'coverage' && (
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Coverage Comparison</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Coverage Type</th>
                      {plans.map(plan => (
                        <th key={plan.id} className="text-left py-3 px-4">{plan.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Medical Expenses</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4">₹{plan.coverage.medical.toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Trip Cancellation</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4">₹{plan.coverage.cancellation.toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Baggage Loss</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4">₹{plan.coverage.baggage.toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium">Flight Delay</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4">₹{plan.coverage.delay.toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium">Accidental Death</td>
                      {plans.map(plan => (
                        <td key={plan.id} className="py-3 px-4">₹{plan.coverage.accident.toLocaleString()}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Assistance</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">24/7 Emergency Helpline</p>
                      <p className="text-sm text-gray-600">+91 1800 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email Support</p>
                      <p className="text-sm text-gray-600">emergency@travelease.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Live Chat</p>
                      <p className="text-sm text-gray-600">24/7 instant support</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Claim Process</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: 'Submit Claim', desc: 'File your claim online with supporting documents' },
                    { step: 2, title: 'Document Review', desc: 'We verify your documents and claim details' },
                    { step: 3, title: 'Claim Assessment', desc: 'Our team assesses your claim' },
                    { step: 4, title: 'Payment Processing', desc: 'Approved claims are paid within 5-7 days' }
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {showPlanModal && selectedPlan && (
          <InsurancePurchaseModal
            plan={selectedPlan}
            onClose={() => setShowPlanModal(false)}
            onPurchase={handlePurchase}
          />
        )}
      </AnimatePresence>

      {/* Claim Modal */}
      <AnimatePresence>
        {showClaimModal && selectedPlan && (
          <ClaimModal
            policy={selectedPlan}
            onClose={() => setShowClaimModal(false)}
          />
        )}
      </AnimatePresence>

      {/* Tracking Modal */}
      <AnimatePresence>
        {showTrackingModal && selectedClaim && (
          <ClaimTrackingModal
            claim={selectedClaim}
            onClose={() => setShowTrackingModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal Components
const InsurancePurchaseModal = ({ plan, onClose, onPurchase }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    startDate: '',
    travelers: [{ name: '', age: '', relation: 'Self' }],
    addBeneficiaries: false
  });

  const handleAddTraveler = () => {
    setFormData({
      ...formData,
      travelers: [...formData.travelers, { name: '', age: '', relation: 'Family' }]
    });
  };

  const handleRemoveTraveler = (index) => {
    const newTravelers = formData.travelers.filter((_, i) => i !== index);
    setFormData({ ...formData, travelers: newTravelers });
  };

  const handleTravelerChange = (index, field, value) => {
    const newTravelers = [...formData.travelers];
    newTravelers[index][field] = value;
    setFormData({ ...formData, travelers: newTravelers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      onPurchase(formData);
    }
  };

  const calculateTotal = () => {
    return plan.price * formData.travelers.length;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Purchase {plan.name}</h2>
              <p className="text-gray-600 mt-1">Step {step} of 2</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-gray-200 rounded-full mb-8">
            <div
              className="absolute h-2 bg-blue-600 rounded-full transition-all"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">Travelers</label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddTraveler}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Traveler
                    </Button>
                  </div>

                  {formData.travelers.map((traveler, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 mb-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Traveler {index + 1}</h4>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTraveler(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={traveler.name}
                            onChange={(e) => handleTravelerChange(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Age</label>
                          <input
                            type="number"
                            value={traveler.age}
                            onChange={(e) => handleTravelerChange(index, 'age', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Premium:</span>
                    <span className="text-xl font-bold text-blue-600">₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Review & Confirm</h3>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Plan Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-medium">{plan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trip Start</span>
                      <span className="font-medium">{new Date(formData.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Travelers</span>
                      <span className="font-medium">{formData.travelers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Premium</span>
                      <span className="font-medium">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Coverage Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Medical Expenses</span>
                      <span className="font-medium">₹{plan.coverage.medical.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trip Cancellation</span>
                      <span className="font-medium">₹{plan.coverage.cancellation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Baggage Loss</span>
                      <span className="font-medium">₹{plan.coverage.baggage.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    By proceeding, you confirm that all information provided is accurate and you agree to the terms and conditions.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button type="submit" variant="primary" className="ml-auto">
                {step === 2 ? 'Confirm & Pay' : 'Continue'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const ClaimModal = ({ policy, onClose }) => {
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    description: '',
    amount: '',
    documents: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Claim submitted successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">File a Claim</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Claim Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select claim type</option>
                <option value="Medical">Medical Emergency</option>
                <option value="Cancellation">Trip Cancellation</option>
                <option value="Delay">Flight Delay</option>
                <option value="Baggage">Baggage Loss/Delay</option>
                <option value="Accident">Accidental Injury</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Incident *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                placeholder="Describe what happened..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Claim Amount (₹) *
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporting Documents
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button type="button" variant="outline" fullWidth onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" fullWidth>
                Submit Claim
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const ClaimTrackingModal = ({ claim, onClose }) => {
  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'success', label: 'Active', icon: CheckCircle },
      expired: { variant: 'secondary', label: 'Expired', icon: Clock },
      processing: { variant: 'warning', label: 'Processing', icon: Clock },
      approved: { variant: 'success', label: 'Approved', icon: CheckCircle },
      rejected: { variant: 'danger', label: 'Rejected', icon: XCircle }
    };
    return variants[status] || variants.processing;
  };

  const statusBadge = getStatusBadge(claim.status);
  const StatusIcon = statusBadge.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Claim Tracking</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600">Claim ID</p>
                <p className="font-bold text-gray-900">{claim.id}</p>
              </div>
              <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                <StatusIcon className="w-3 h-3" />
                {statusBadge.label}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Claim Type</p>
                <p className="font-medium">{claim.type}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="font-medium">₹{claim.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Filed On</p>
                <p className="font-medium">{new Date(claim.date).toLocaleDateString()}</p>
              </div>
              {claim.approvedDate && (
                <div>
                  <p className="text-xs text-gray-500">Approved On</p>
                  <p className="font-medium">{new Date(claim.approvedDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mb-4">Tracking Timeline</h4>
          <div className="space-y-4">
            {claim.trackingSteps.map((step, index) => (
              <div key={index} className="relative pl-8 pb-4 last:pb-0">
                {index < claim.trackingSteps.length - 1 && (
                  <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-gray-200"></div>
                )}
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-green-600' :
                  step.status === 'rejected' ? 'bg-red-600' :
                  'bg-gray-300'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : step.status === 'rejected' ? (
                    <XCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Clock className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{step.step}</p>
                  {step.date && (
                    <p className="text-sm text-gray-500">{new Date(step.date).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TravelInsurance;