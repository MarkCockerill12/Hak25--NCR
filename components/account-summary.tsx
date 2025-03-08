import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface AccountSummaryProps {
  title: string
  accountNumber: string
  balance: number
  change: number
  isCredit?: boolean
}

export function AccountSummary({ title, accountNumber, balance, change, isCredit = false }: AccountSummaryProps) {
  const formattedBalance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(balance))

  const formattedChange = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Math.abs(change))

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-900 dark:text-white">{title}</CardTitle>
        <CardDescription className="text-xs text-gray-500 dark:text-gray-400">{accountNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {isCredit && balance < 0 ? "-" : ""}
          {formattedBalance}
        </div>
        <div className="flex items-center pt-1 text-xs">
          {change > 0 ? (
            <>
              <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">{formattedChange}</span>
            </>
          ) : (
            <>
              <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">{formattedChange}</span>
            </>
          )}
          <span className="ml-1 text-gray-500 dark:text-gray-400">since last week</span>
        </div>
      </CardContent>
    </Card>
  )
}

