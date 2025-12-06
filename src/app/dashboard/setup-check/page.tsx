// Setup verification page
// Navigate to /dashboard/setup-check to verify your configuration

import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SetupCheckPage() {
  const checks = [
    {
      name: 'AWS Region',
      value: process.env.AWS_REGION,
      required: true,
    },
    {
      name: 'AWS Access Key',
      value: process.env.AWS_ACCESS_KEY_ID,
      required: true,
      masked: true,
    },
    {
      name: 'AWS Secret Key',
      value: process.env.AWS_SECRET_ACCESS_KEY,
      required: true,
      masked: true,
    },
    {
      name: 'AWS S3 Bucket',
      value: process.env.AWS_S3_BUCKET,
      required: true,
    },
    {
      name: 'AWS S3 Bucket URL',
      value: process.env.AWS_S3_BUCKET_URL,
      required: true,
    },
    {
      name: 'Database URL',
      value: process.env.POSTGRES_URL,
      required: true,
      masked: true,
    },
    {
      name: 'Auth Secret',
      value: process.env.AUTH_SECRET,
      required: true,
      masked: true,
    },
    {
      name: 'Max File Size',
      value: process.env.MAX_FILE_SIZE,
      required: false,
    },
  ];

  const allRequired = checks.filter(c => c.required).every(c => c.value);
  const missingCount = checks.filter(c => c.required && !c.value).length;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Setup Verification</h1>
        <p className="text-muted-foreground">
          Check your environment configuration
        </p>
      </div>

      {/* Overall Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {allRequired ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Configuration Complete
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                Configuration Incomplete
              </>
            )}
          </CardTitle>
          <CardDescription>
            {allRequired
              ? 'All required environment variables are set'
              : `${missingCount} required variable${missingCount !== 1 ? 's' : ''} missing`}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Environment Variables */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <CardDescription>
            Status of your .env.local configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checks.map((check) => {
              const isSet = !!check.value;
              const displayValue = check.masked && check.value
                ? '••••••••••••••••'
                : check.value || 'Not set';

              return (
                <div
                  key={check.name}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    {isSet ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-medium">{check.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {displayValue}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {check.required && (
                      <Badge variant="secondary">Required</Badge>
                    )}
                    {isSet ? (
                      <Badge variant="default" className="bg-green-500">
                        Set
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Missing</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      {!allRequired && (
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              Complete these steps to finish setup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              {!process.env.POSTGRES_URL && (
                <li>
                  Add your database connection string to <code>.env.local</code>
                  <br />
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
                    POSTGRES_URL=your_connection_string
                  </code>
                </li>
              )}
              {!process.env.AWS_ACCESS_KEY_ID && (
                <li>
                  Add your AWS credentials to <code>.env.local</code>
                </li>
              )}
              {!process.env.AUTH_SECRET && (
                <li>
                  Generate an auth secret:
                  <br />
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
                    openssl rand -base64 32
                  </code>
                </li>
              )}
              <li>Restart your development server after updating .env.local</li>
              <li>
                Run the database migration:
                <br />
                <code className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block">
                  psql $POSTGRES_URL -f scripts/migrations/002_products.sql
                </code>
              </li>
            </ol>
          </CardContent>
        </Card>
      )}

      {/* Success Message */}
      {allRequired && (
        <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-300">
              Ready to Go! 🎉
            </CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              Your environment is configured correctly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 dark:text-green-300">
              You can now:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-300 mt-2">
              <li>Create products at /dashboard/products/create</li>
              <li>Upload files to AWS S3</li>
              <li>Manage your product catalog</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
