"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent } from "./ui/card"
import { Calculator } from "lucide-react"

interface InterestCalculatorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function InterestCalculator({ open, onOpenChange }: InterestCalculatorProps) {
  const [calculatorType, setCalculatorType] = useState("simple")

  // Simple Interest Calculator
  const [simpleInitialAmount, setSimpleInitialAmount] = useState("")
  const [simpleInterestRate, setSimpleInterestRate] = useState("")
  const [simpleYears, setSimpleYears] = useState("")

  // Compound Interest Calculator
  const [compoundInitialAmount, setCompoundInitialAmount] = useState("")
  const [compoundInterestRate, setCompoundInterestRate] = useState("")
  const [compoundYears, setCompoundYears] = useState("")
  const [compoundFrequency, setCompoundFrequency] = useState("12")
  const [monthlyContribution, setMonthlyContribution] = useState("")

  // Calculate simple interest
  const calculateSimpleInterest = () => {
    const principal = Number.parseFloat(simpleInitialAmount)
    const rate = Number.parseFloat(simpleInterestRate) / 100
    const time = Number.parseFloat(simpleYears)

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) return null

    const interest = principal * rate * time
    const finalAmount = principal + interest

    return {
      interest: interest.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
    }
  }

  // Calculate compound interest
  const calculateCompoundInterest = () => {
    const principal = Number.parseFloat(compoundInitialAmount)
    const rate = Number.parseFloat(compoundInterestRate) / 100
    const time = Number.parseFloat(compoundYears)
    const n = Number.parseFloat(compoundFrequency)
    const monthlyDeposit = Number.parseFloat(monthlyContribution) || 0

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || isNaN(n)) return null

    // Calculate compound interest with monthly contributions
    let finalAmount = principal
    const monthlyRate = rate / 12
    const totalMonths = time * 12

    for (let i = 0; i < totalMonths; i++) {
      finalAmount = finalAmount * (1 + monthlyRate) + monthlyDeposit
    }

    const interest = finalAmount - principal - monthlyDeposit * totalMonths

    return {
      interest: interest.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
      totalContributions: (monthlyDeposit * totalMonths).toFixed(2),
    }
  }

  const simpleResults = calculateSimpleInterest()
  const compoundResults = calculateCompoundInterest()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Interest Calculator
          </DialogTitle>
          <DialogDescription>
            Calculate how your savings will grow over time with different interest rates.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={calculatorType} onValueChange={setCalculatorType} className="pt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple Interest</TabsTrigger>
            <TabsTrigger value="compound">Compound Interest</TabsTrigger>
          </TabsList>

          <TabsContent value="simple" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="simpleInitialAmount">Initial Amount ($)</Label>
                  <Input
                    id="simpleInitialAmount"
                    type="number"
                    value={simpleInitialAmount}
                    onChange={(e) => setSimpleInitialAmount(e.target.value)}
                    placeholder="1000"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="simpleInterestRate">Interest Rate (%)</Label>
                  <Input
                    id="simpleInterestRate"
                    type="number"
                    value={simpleInterestRate}
                    onChange={(e) => setSimpleInterestRate(e.target.value)}
                    placeholder="5"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="simpleYears">Time Period (Years)</Label>
                <Input
                  id="simpleYears"
                  type="number"
                  value={simpleYears}
                  onChange={(e) => setSimpleYears(e.target.value)}
                  placeholder="5"
                  min="0"
                  step="0.5"
                />
              </div>

              {simpleResults && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Interest Earned</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${simpleResults.interest}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Final Amount</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">${simpleResults.finalAmount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="compound" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="compoundInitialAmount">Initial Amount ($)</Label>
                  <Input
                    id="compoundInitialAmount"
                    type="number"
                    value={compoundInitialAmount}
                    onChange={(e) => setCompoundInitialAmount(e.target.value)}
                    placeholder="1000"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compoundInterestRate">Interest Rate (%)</Label>
                  <Input
                    id="compoundInterestRate"
                    type="number"
                    value={compoundInterestRate}
                    onChange={(e) => setCompoundInterestRate(e.target.value)}
                    placeholder="5"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="compoundYears">Time Period (Years)</Label>
                  <Input
                    id="compoundYears"
                    type="number"
                    value={compoundYears}
                    onChange={(e) => setCompoundYears(e.target.value)}
                    placeholder="5"
                    min="0"
                    step="0.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="compoundFrequency">Compound Frequency</Label>
                  <select
                    id="compoundFrequency"
                    value={compoundFrequency}
                    onChange={(e) => setCompoundFrequency(e.target.value)}
                    className="w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm"
                  >
                    <option value="1">Annually</option>
                    <option value="2">Semi-annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="365">Daily</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="100"
                  min="0"
                />
              </div>

              {compoundResults && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Interest Earned</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${compoundResults.interest}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Final Amount</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${compoundResults.finalAmount}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Total Contributions</p>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        ${compoundResults.totalContributions}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

