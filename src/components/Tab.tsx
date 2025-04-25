"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GrPowerReset } from "react-icons/gr";

export default function CompoundInterestCalculator() {
  const [principalAmount, setPrincipalAmount] = useState<number | undefined>();
  const [interestRate, setInterestRate] = useState<number | undefined>();
  const [timePeriodInYear, setTimePeriodInYear] = useState<
    number | undefined
  >();
  const [totalValue, setTotalValue] = useState<number | undefined>();
  const [interestEarned, setInterestEarned] = useState<number | undefined>();

  const calculateCompoundInterest = () => {
    if (principalAmount && interestRate && timePeriodInYear) {
      const rate = interestRate / 100;
      const compoundInterest =
        principalAmount * Math.pow(1 + rate / 12, 12 * timePeriodInYear);
      const interest = compoundInterest - principalAmount;
      setTotalValue(compoundInterest);
      setInterestEarned(interest);
      toast.success("Compound Interest calculated successfully!");
    } else {
      toast.error("Please fill in all fields!");
    }
  };

  const resetValues = () => {
    setPrincipalAmount(undefined);
    setInterestRate(undefined);
    setTimePeriodInYear(undefined);
    setTotalValue(undefined);
    setInterestEarned(undefined);
  };

  return (
    <div className="min-h-screen bg-black text-white py-6 px-4 flex items-center justify-center">
      <Card className="w-full max-w-md md:max-w-lg bg-zinc-900 border border-zinc-700 shadow-xl rounded-2xl">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-xl font-bold text-white">
            Compound Interest Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label className="text-white">Principal Amount (₹)</Label>
            <input
              type="number"
              value={principalAmount || ""}
              onChange={(e) => setPrincipalAmount(Number(e.target.value))}
              placeholder="Enter principal amount"
              className="w-full p-2 bg-zinc-800 text-white border border-zinc-600"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Interest Rate (%)</Label>
            <input
              type="number"
              value={interestRate || ""}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              placeholder="Enter interest rate"
              className="w-full p-2 bg-zinc-800 text-white border border-zinc-600"
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-white">Time Period (Years)</Label>
            <input
              type="number"
              value={timePeriodInYear || ""}
              onChange={(e) => setTimePeriodInYear(Number(e.target.value))}
              placeholder="Enter time period"
              className="w-full p-2 bg-zinc-800 text-white border border-zinc-600"
            />
          </div>

          <div className="flex justify-center items-center gap-3">
            <Button
              className="w-[90%] bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={calculateCompoundInterest}
            >
              Calculate
            </Button>
            <GrPowerReset
              onClick={resetValues}
              className="w-fit text-white font-bold text-2xl cursor-pointer"
            />
          </div>
        </CardContent>
      </Card>

      {totalValue && interestEarned !== undefined && (
        <div className="bg-zinc-900 text-white p-4 mt-6 md:ml-10 rounded-lg border border-zinc-700 w-full md:max-w-sm text-center space-y-2">
          <p className="text-xl font-semibold text-blue-400">
            Your Compound Interest Details
          </p>
          <p>
            Principle Amount:{" "}
            <span className="text-blue-400">₹ {principalAmount}</span>
          </p>
          <p>
            Interest Earned:{" "}
            <span className="text-blue-400">₹ {interestEarned.toFixed(2)}</span>
          </p>
          <p>
            Total Value:{" "}
            <span className="text-blue-400">₹ {totalValue.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
