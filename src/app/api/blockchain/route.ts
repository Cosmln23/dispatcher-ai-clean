import { NextRequest, NextResponse } from 'next/server';

// Blockchain Transparency Engine
interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  type: 'payment' | 'escrow' | 'refund' | 'reward';
  orderId?: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed?: number;
  blockNumber?: number;
  txHash?: string;
}

interface SmartContract {
  address: string;
  name: string;
  type: 'transport' | 'payment' | 'insurance' | 'carbon';
  abi: any[];
  deployed: boolean;
  version: string;
}

// Mock blockchain data for development
const mockTransactions: Transaction[] = [
  {
    id: '1',
    from: '0x742d35Cc6C3C99532A3d34f8B9F1E2c0C4b0f0f0',
    to: '0x8ba1f109551bD432803012645Hac136c14f1d3B9',
    amount: 2850,
    type: 'payment',
    orderId: 'ORD-2024-001',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'confirmed',
    gasUsed: 21000,
    blockNumber: 18920847,
    txHash: '0xa1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456'
  },
  {
    id: '2',
    from: '0x8ba1f109551bD432803012645Hac136c14f1d3B9',
    to: '0x742d35Cc6C3C99532A3d34f8B9F1E2c0C4b0f0f0',
    amount: 150,
    type: 'reward',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    status: 'confirmed',
    gasUsed: 45000,
    blockNumber: 18920889,
    txHash: '0xdef123456789012345678901234567890abcdef1234567890abcdef123456789'
  }
];

const mockContracts: SmartContract[] = [
  {
    address: '0x1234567890123456789012345678901234567890',
    name: 'TransportLedger',
    type: 'transport',
    abi: [],
    deployed: true,
    version: '2.1.0'
  },
  {
    address: '0x0987654321098765432109876543210987654321',
    name: 'PaymentEscrow',
    type: 'payment',
    abi: [],
    deployed: true,
    version: '1.8.3'
  },
  {
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    name: 'CarbonCredits',
    type: 'carbon',
    abi: [],
    deployed: true,
    version: '1.2.1'
  }
];

// POST - Create new blockchain transaction
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, from, to, amount, orderId, contractAddress } = body;

    console.log('⛓️  Creating blockchain transaction:', { type, amount, orderId });

    // Validate transaction data
    if (!from || !to || !amount) {
      return NextResponse.json({
        success: false,
        error: 'Missing required transaction parameters',
        required: ['from', 'to', 'amount']
      }, { status: 400 });
    }

    // Simulate transaction creation
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const newTransaction: Transaction = {
      id: `tx_${Date.now()}`,
      from,
      to,
      amount,
      type: type || 'payment',
      orderId,
      timestamp: new Date().toISOString(),
      status: Math.random() > 0.1 ? 'confirmed' : 'pending', // 90% success rate
      gasUsed: 21000 + Math.floor(Math.random() * 50000),
      blockNumber: 18920847 + Math.floor(Math.random() * 1000),
      txHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };

    // Add to mock database
    mockTransactions.unshift(newTransaction);

    // Calculate transaction metrics
    const metrics = {
      confirmationTime: Math.random() * 30 + 10, // 10-40 seconds
      gasPrice: (Math.random() * 50 + 10).toFixed(2), // 10-60 gwei
      networkFee: (newTransaction.gasUsed! * 0.00000002).toFixed(6), // ETH
      carbonFootprint: (Math.random() * 0.1).toFixed(4), // kg CO2
      transparency: {
        immutable: true,
        verifiable: true,
        decentralized: true,
        auditable: true
      }
    };

    return NextResponse.json({
      success: true,
      transaction: newTransaction,
      metrics,
      blockchainInfo: {
        network: 'Ethereum',
        chainId: 1,
        latestBlock: newTransaction.blockNumber,
        gasLimit: 30000000
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Blockchain Transaction Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to create blockchain transaction',
      message: 'Tranzacția blockchain a eșuat. Verifică datele și încearcă din nou.',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// GET - Fetch blockchain data
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type') || 'transactions';
  const address = url.searchParams.get('address');
  const orderId = url.searchParams.get('orderId');
  const limit = parseInt(url.searchParams.get('limit') || '10');

  try {
    if (type === 'transactions') {
      let filteredTx = [...mockTransactions];
      
      // Filter by address
      if (address) {
        filteredTx = filteredTx.filter(tx => 
          tx.from.toLowerCase() === address.toLowerCase() || 
          tx.to.toLowerCase() === address.toLowerCase()
        );
      }
      
      // Filter by order ID
      if (orderId) {
        filteredTx = filteredTx.filter(tx => tx.orderId === orderId);
      }
      
      // Apply limit
      filteredTx = filteredTx.slice(0, limit);

      // Calculate statistics
      const stats = {
        total: filteredTx.length,
        confirmed: filteredTx.filter(tx => tx.status === 'confirmed').length,
        pending: filteredTx.filter(tx => tx.status === 'pending').length,
        failed: filteredTx.filter(tx => tx.status === 'failed').length,
        totalValue: filteredTx.reduce((sum, tx) => sum + tx.amount, 0),
        averageGas: filteredTx.reduce((sum, tx) => sum + (tx.gasUsed || 0), 0) / filteredTx.length
      };

      return NextResponse.json({
        success: true,
        transactions: filteredTx,
        statistics: stats,
        blockchain: {
          network: 'Ethereum',
          blockHeight: 18921847,
          gasPrice: (Math.random() * 50 + 10).toFixed(2) + ' gwei',
          networkStatus: 'healthy'
        },
        timestamp: new Date().toISOString()
      });
    }

    if (type === 'contracts') {
      return NextResponse.json({
        success: true,
        contracts: mockContracts,
        deployment: {
          totalContracts: mockContracts.length,
          activeContracts: mockContracts.filter(c => c.deployed).length,
          latestVersion: '2.1.0'
        },
        gasUsage: {
          deployment: 1250000,
          average: 75000,
          optimization: '23% gas savings vs v1.0'
        },
        timestamp: new Date().toISOString()
      });
    }

    if (type === 'analytics') {
      // Blockchain analytics and insights
      const analytics = {
        volume: {
          daily: 125000 + Math.random() * 50000,
          weekly: 875000 + Math.random() * 200000,
          monthly: 3500000 + Math.random() * 1000000
        },
        performance: {
          averageConfirmation: 15.3 + Math.random() * 10,
          successRate: 98.7 + Math.random() * 1.2,
          gasEfficiency: 92.1 + Math.random() * 5,
          networkUptime: 99.98
        },
        carbonImpact: {
          totalFootprint: 12.47, // kg CO2
          offsetPercentage: 87.3,
          greenEnergy: 72.1,
          carbonCredits: 156
        },
        transparency: {
          auditableTransactions: '100%',
          publicVerification: true,
          decentralizationScore: 94.7,
          immutabilityGuarantee: '99.99%'
        }
      };

      return NextResponse.json({
        success: true,
        analytics,
        trends: {
          gasPrice: 'decreasing',
          volume: 'increasing',
          adoption: 'growing',
          efficiency: 'improving'
        },
        timestamp: new Date().toISOString()
      });
    }

    if (type === 'wallet') {
      // Wallet information
      const walletAddress = address || '0x742d35Cc6C3C99532A3d34f8B9F1E2c0C4b0f0f0';
      
      // Filter transactions for this wallet
      let filteredTx = [...mockTransactions];
      if (address) {
        filteredTx = filteredTx.filter(tx => 
          tx.from.toLowerCase() === address.toLowerCase() || 
          tx.to.toLowerCase() === address.toLowerCase()
        );
      }
      
      return NextResponse.json({
        success: true,
        wallet: {
          address: walletAddress,
          balance: {
            eth: (Math.random() * 10 + 1).toFixed(4),
            usd: (Math.random() * 25000 + 5000).toFixed(2),
            tokens: [
              { symbol: 'DISP', name: 'DispatcherAI Token', balance: '1250.75' },
              { symbol: 'CARBON', name: 'Carbon Credits', balance: '87.23' }
            ]
          },
          transactions: filteredTx.length,
          firstActivity: '2024-01-15T10:30:00Z',
          reputation: 97.8 + Math.random() * 2.1
        },
        security: {
          multiSig: true,
          hardware: false,
          encrypted: true,
          backupVerified: true
        },
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Unknown blockchain data type',
      available: ['transactions', 'contracts', 'analytics', 'wallet']
    }, { status: 400 });

  } catch (error) {
    console.error('Blockchain Data Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch blockchain data',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// PUT - Update transaction status or smart contract
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { transactionId, status, contractAddress, action } = body;

    console.log('⛓️  Updating blockchain entity:', { transactionId, status, action });

    if (transactionId) {
      // Update transaction status
      const txIndex = mockTransactions.findIndex(tx => tx.id === transactionId);
      
      if (txIndex === -1) {
        return NextResponse.json({
          success: false,
          error: 'Transaction not found',
          transactionId
        }, { status: 404 });
      }

      mockTransactions[txIndex].status = status;
      
      return NextResponse.json({
        success: true,
        transaction: mockTransactions[txIndex],
        updated: ['status'],
        timestamp: new Date().toISOString()
      });
    }

    if (contractAddress && action) {
      // Smart contract interaction
      const contract = mockContracts.find(c => c.address === contractAddress);
      
      if (!contract) {
        return NextResponse.json({
          success: false,
          error: 'Smart contract not found',
          contractAddress
        }, { status: 404 });
      }

      // Simulate contract interaction
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500));

      const result = {
        contract: contract.name,
        action,
        result: 'success',
        gasUsed: 45000 + Math.floor(Math.random() * 30000),
        txHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        blockNumber: 18920847 + Math.floor(Math.random() * 100)
      };

      return NextResponse.json({
        success: true,
        contractInteraction: result,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid update parameters',
      required: 'transactionId with status OR contractAddress with action'
    }, { status: 400 });

  } catch (error) {
    console.error('Blockchain Update Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to update blockchain entity',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// DELETE - Cancel pending transaction
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const transactionId = url.searchParams.get('transactionId');

  try {
    if (!transactionId) {
      return NextResponse.json({
        success: false,
        error: 'Transaction ID required'
      }, { status: 400 });
    }

    const txIndex = mockTransactions.findIndex(tx => tx.id === transactionId);
    
    if (txIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Transaction not found'
      }, { status: 404 });
    }

    const transaction = mockTransactions[txIndex];
    
    // Only pending transactions can be cancelled
    if (transaction.status !== 'pending') {
      return NextResponse.json({
        success: false,
        error: 'Only pending transactions can be cancelled',
        currentStatus: transaction.status
      }, { status: 400 });
    }

    // Mark as failed/cancelled
    mockTransactions[txIndex].status = 'failed';

    return NextResponse.json({
      success: true,
      message: 'Transaction cancelled successfully',
      transaction: mockTransactions[txIndex],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Blockchain Cancel Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to cancel transaction',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 