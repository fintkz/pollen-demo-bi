import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package,
  ShoppingCart, 
  Users,
  Eye,
  MessageSquare,
  TrendingUp,
  DollarSign,
  Globe,
  Target,
  BarChart3,
  Star,
  CheckCircle,
  Search,
  Filter,
  ChevronRight,
  Clock,
  Zap
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  stock: number;
  views: number;
  inquiries: number;
  rating: number;
  image: string;
  status: 'active' | 'hot' | 'new';
  discount: number;
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'L\'Oréal Revitalift Anti-Wrinkle Firming Cream',
    brand: 'L\'Oréal Paris',
    category: 'Anti-Aging Skincare',
    price: 18.99,
    originalPrice: 24.99,
    stock: 145,
    views: 2847,
    inquiries: 23,
    rating: 4.6,
    image: '/api/placeholder/200/200',
    status: 'hot',
    discount: 24
  },
  {
    id: '2',
    name: 'L\'Oréal True Match Foundation SPF 17',
    brand: 'L\'Oréal Paris',
    category: 'Makeup Foundation',
    price: 9.99,
    originalPrice: 12.95,
    stock: 289,
    views: 1923,
    inquiries: 18,
    rating: 4.4,
    image: '/api/placeholder/200/200',
    status: 'active',
    discount: 23
  },
  {
    id: '3',
    name: 'L\'Oréal Elvive Total Repair 5 Shampoo',
    brand: 'L\'Oréal Paris',
    category: 'Hair Care',
    price: 4.49,
    originalPrice: 5.99,
    stock: 342,
    views: 1256,
    inquiries: 12,
    rating: 4.3,
    image: '/api/placeholder/200/200',
    status: 'new',
    discount: 25
  },
  {
    id: '4',
    name: 'L\'Oréal Age Perfect Golden Age Serum',
    brand: 'L\'Oréal Paris',
    category: 'Premium Skincare',
    price: 22.99,
    originalPrice: 32.99,
    stock: 78,
    views: 3124,
    inquiries: 31,
    rating: 4.8,
    image: '/api/placeholder/200/200',
    status: 'hot',
    discount: 30
  },
  {
    id: '5',
    name: 'L\'Oréal Voluminous Lash Paradise Mascara',
    brand: 'L\'Oréal Paris',
    category: 'Eye Makeup',
    price: 7.99,
    originalPrice: 10.99,
    stock: 198,
    views: 1687,
    inquiries: 15,
    rating: 4.5,
    image: '/api/placeholder/200/200',
    status: 'active',
    discount: 27
  },
  {
    id: '6',
    name: 'L\'Oréal Preference Hair Color Kit',
    brand: 'L\'Oréal Preference',
    category: 'Hair Color',
    price: 6.49,
    originalPrice: 9.99,
    stock: 156,
    views: 987,
    inquiries: 8,
    rating: 4.2,
    image: '/api/placeholder/200/200',
    status: 'active',
    discount: 35
  }
];

const marketplaceStats = {
  totalProducts: 2347,
  activeListings: 2201,
  totalViews: 45678,
  totalInquiries: 234,
  averageDiscount: 26,
  conversionRate: 12.4
};

export const MarketplacePreview = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Products', count: 2347 },
    { id: 'skincare', name: 'Skincare', count: 847 },
    { id: 'makeup', name: 'Makeup', count: 923 },
    { id: 'haircare', name: 'Hair Care', count: 421 },
    { id: 'fragrance', name: 'Fragrances', count: 156 }
  ];

  const filteredProducts = featuredProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           product.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-500 text-white';
      case 'new': return 'bg-blue-500 text-white';
      case 'active': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hot': return <Zap className="h-3 w-3" />;
      case 'new': return <Star className="h-3 w-3" />;
      case 'active': return <CheckCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto" onWheel={(e) => e.stopPropagation()}>
      <div className="p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-semibold institutional-heading">
              Pollen Direct Marketplace
            </h1>
            <p className="text-lg text-muted-foreground">
              L'Oréal Q4 2024 Inventory - Live on Pollen Direct
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Card className="p-4 text-center">
              <Package className="h-5 w-5 mx-auto text-accent-blue mb-2" />
              <div className="text-2xl font-bold financial-data">{marketplaceStats.totalProducts}</div>
              <div className="text-xs text-muted-foreground">Products</div>
            </Card>
            <Card className="p-4 text-center">
              <ShoppingCart className="h-5 w-5 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold financial-data">{marketplaceStats.activeListings}</div>
              <div className="text-xs text-muted-foreground">Active</div>
            </Card>
            <Card className="p-4 text-center">
              <Eye className="h-5 w-5 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold financial-data">{marketplaceStats.totalViews.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Views</div>
            </Card>
            <Card className="p-4 text-center">
              <MessageSquare className="h-5 w-5 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold financial-data">{marketplaceStats.totalInquiries}</div>
              <div className="text-xs text-muted-foreground">Inquiries</div>
            </Card>
            <Card className="p-4 text-center">
              <TrendingUp className="h-5 w-5 mx-auto text-orange-600 mb-2" />
              <div className="text-2xl font-bold financial-data">{marketplaceStats.averageDiscount}%</div>
              <div className="text-xs text-muted-foreground">Avg Discount</div>
            </Card>
            <Card className="p-4 text-center">
              <Target className="h-5 w-5 mx-auto text-pink-600 mb-2" />
              <div className="text-2xl font-bold financial-data">{marketplaceStats.conversionRate}%</div>
              <div className="text-xs text-muted-foreground">Conversion</div>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue"
              />
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-sm"
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 relative">
                  <Badge className={`absolute top-3 right-3 ${getStatusColor(product.status)}`}>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(product.status)}
                      <span className="text-xs capitalize">{product.status}</span>
                    </div>
                  </Badge>
                  <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    -{product.discount}%
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-medium text-foreground text-sm line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.brand} • {product.category}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-success">${product.price}</span>
                        <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{product.stock} in stock</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground">({product.rating})</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{product.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>{product.inquiries} inquiries</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full surgical-button bg-accent-blue hover:bg-accent-blue/90">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Marketplace Actions */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-blue-900 mb-2">Marketplace Management</h3>
                <p className="text-sm text-blue-800">Monitor performance, manage listings, and engage with buyers</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Buyer Messages
                </Button>
                <Button variant="outline" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  Expand Market
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};