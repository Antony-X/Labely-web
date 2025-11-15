import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Button from '../components/Button'
import Card from '../components/Card'
import { Zap, Target, DollarSign, Award, CheckCircle, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              The fastest way to get{' '}
              <span className="gradient-text">high-quality labeled data</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Upload your data, configure quality settings, and get back expertly labeled
              datasets in hours. Built for ML teams that ship fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Create a project</Button>
              <Button variant="secondary" size="lg">
                Book a demo
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div>
                <span className="text-2xl font-bold text-white">10M+</span>
                <p>Items labeled</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">500+</span>
                <p>Organizations</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-white">&lt;24h</span>
                <p>Avg turnaround</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-gray-400 text-lg">Three simple steps to labeled data</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload & Configure</h3>
              <p className="text-gray-400">
                Upload your dataset, define label classes, and set quality requirements. Our
                wizard guides you through every step.
              </p>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Labeling</h3>
              <p className="text-gray-400">
                Our network of verified labelers gets to work. Each item is labeled multiple
                times based on your settings.
              </p>
            </Card>
            <Card>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download Results</h3>
              <p className="text-gray-400">
                Track progress in real-time. Download your labeled data in your preferred
                format as soon as it's ready.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why teams choose Labely</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card hover>
              <Zap className="text-purple-400 mb-4" size={40} />
              <h3 className="text-2xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400">
                Average turnaround under 24 hours. Rush options available for urgent projects.
                Scale to millions of items without delays.
              </p>
            </Card>
            <Card hover>
              <Target className="text-pink-400 mb-4" size={40} />
              <h3 className="text-2xl font-semibold mb-2">Guaranteed Quality</h3>
              <p className="text-gray-400">
                Multi-labeler consensus, ELO-ranked labelers, and automated gold-standard
                checks ensure accuracy you can trust.
              </p>
            </Card>
            <Card hover>
              <DollarSign className="text-purple-400 mb-4" size={40} />
              <h3 className="text-2xl font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-400">
                Pay only for completed labels. Set your budget and per-item pricing upfront.
                No hidden fees or surprises.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why trust our labels?</h2>
            <p className="text-gray-400 text-lg">
              We built quality controls into every layer of the platform
            </p>
          </div>
          <div className="space-y-6">
            <Card>
              <div className="flex items-start gap-4">
                <Award className="text-purple-400 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">ELO Rating System</h3>
                  <p className="text-gray-400">
                    Every labeler has a skill rating that updates based on accuracy. Set minimum
                    ELO requirements to ensure only top performers work on your data.
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-4">
                <CheckCircle className="text-pink-400 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gold-Standard Checks</h3>
                  <p className="text-gray-400">
                    Insert pre-labeled "gold" items throughout your project. We automatically
                    flag labelers who fail these checks and redistribute their work.
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-4">
                <TrendingUp className="text-purple-400 flex-shrink-0" size={32} />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Active Learning</h3>
                  <p className="text-gray-400">
                    Our system identifies low-confidence labels and routes them for additional
                    review, ensuring you never ship uncertain data.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/20 p-12">
            <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-gray-300 text-lg mb-8">
              Join hundreds of ML teams shipping better models faster
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg">Create your first project</Button>
              </Link>
              <Button variant="secondary" size="lg">
                Schedule a demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
