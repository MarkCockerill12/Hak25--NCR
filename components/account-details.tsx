import type React from "react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { AlertCircle, Calendar, CreditCard, DollarSign, Globe, Info, Percent, User } from "lucide-react"

interface AccountDetailsProps {
  account: {
    id: string
    name: string
    number: string
    type: string
    balance: number
    available: number
    currency: string
    status: string
    isDefault: boolean
  }
  onUpdate?: (updates: Partial<AccountDetailsProps["account"]>) => void
}

export function AccountDetails({ account, onUpdate = () => {} }: AccountDetailsProps) {
  // Mock additional account details
  const accountDetails = {
    openDate: "January 15, 2022",
    accountHolder: "John Doe",
    accountType: "Individual",
    interestRate: account.type === "savings" ? "1.25%" : "0.01%",
    routingNumber: "074000078",
    branch: "Main Street Financial Center",
    lastStatement: "March 1, 2025",
    overdraftLimit: account.type === "checking" ? "$500.00" : "$0.00",
    jointOwners: [],
    features: ["Online Banking", "Mobile Deposits", "Bill Pay", "Zelle Transfers"],
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DetailCard
          icon={<User className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Account Holder"
          value={accountDetails.accountHolder}
        />
        <DetailCard
          icon={<CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Account Number"
          value={account.number}
        />
        <DetailCard
          icon={<Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Opened On"
          value={accountDetails.openDate}
        />
        <DetailCard
          icon={<Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Branch"
          value={accountDetails.branch}
        />
        <DetailCard
          icon={<Percent className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Interest Rate"
          value={accountDetails.interestRate}
        />
        <DetailCard
          icon={<DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          title="Overdraft Limit"
          value={accountDetails.overdraftLimit}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Account Features</h3>
        <div className="flex flex-wrap gap-2">
          {accountDetails.features.map((feature, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            >
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Important Information</h3>
          <Button variant="ghost" size="sm" className="text-blue-600 dark:text-blue-400">
            View All
          </Button>
        </div>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Upcoming Maintenance</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Online banking will be unavailable on Sunday, March 15th from 2:00 AM to 5:00 AM ET for scheduled
                  maintenance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">Interest Rate Change</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Effective April 1, 2025, the interest rate for this account will change to{" "}
                  {account.type === "savings" ? "1.50%" : "0.05%"}.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function DetailCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">{icon}</div>
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
            <div className="font-medium text-gray-900 dark:text-white">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

