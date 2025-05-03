import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ShieldCheck,
  Flame,
  Lock,
  Unlock,
  DollarSign,
  Repeat,
  PauseCircle,
  Users,
  Settings,
} from "lucide-react";

const steps = ["Network", "Token Info", "Token Type", "Advanced", "Deploy"];

export default function CreateTokenPage() {
  const [step, setStep] = useState(0);
  const [tokenFeatures, setTokenFeatures] = useState({
    deflationary: false,
    reflection: false,
    mintable: false,
    burnable: false,
    pausable: false,
    supplyLock: false,
    antiWhale: false,
    customFees: false,
  });

  const toggleFeature = (feature) => {
    setTokenFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }));
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className='max-w-3xl mx-auto py-10 px-4'>
      <h1 className='text-3xl font-bold mb-6'>Create Your Token</h1>

      <Progress value={progress} className='mb-6' />
      <div className='flex justify-between text-sm text-muted-foreground mb-4'>
        {steps.map((s, i) => (
          <span
            key={i}
            className={`${i === step ? "text-gray-800 font-semibold" : ""}`}>
            {s}
          </span>
        ))}
      </div>

      <Card>
        <CardContent className='space-y-6 py-6'>
          {step === 0 && (
            <div className='space-y-4'>
              <label className='block text-sm font-medium'>
                Select Network
              </label>
              <Tabs defaultValue='bsc'>
                <TabsList className='grid grid-cols-3'>
                  <TabsTrigger value='bsc'>BNB Chain</TabsTrigger>
                  <TabsTrigger value='eth'>Ethereum</TabsTrigger>
                  <TabsTrigger value='solana'>Solana</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          )}

          {step === 1 && (
            <div className='space-y-4'>
              <Input
                placeholder='Token Name'
                className='focus:ring-purple-300'
              />
              <Input placeholder='Token Symbol' />
              <Input placeholder='Total Supply' type='number' />
              <Input placeholder='Decimals (default 18)' type='number' />
            </div>
          )}

          {step === 2 && (
            <div className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                {Object.keys(tokenFeatures).map((feature) => (
                  <div key={feature} className='flex items-center space-x-2'>
                    <Checkbox
                      id={feature}
                      checked={tokenFeatures[feature]}
                      onCheckedChange={() => toggleFeature(feature)}
                    />
                    <Label htmlFor={feature} className='capitalize'>
                      {feature.replace(/([A-Z])/g, " $1")}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Dynamic Fields */}
              <div className='space-y-4'>
                {tokenFeatures.deflationary && (
                  <Input placeholder='Deflationary Tax (%)' type='number' />
                )}
                {tokenFeatures.reflection && (
                  <Input
                    placeholder='Reflection Percentage (%)'
                    type='number'
                  />
                )}
                {tokenFeatures.antiWhale && (
                  <Input placeholder='Max Wallet Size (%)' type='number' />
                )}
                {tokenFeatures.customFees && (
                  <div className='grid grid-cols-2 gap-4'>
                    <Input placeholder='Buy Fee (%)' type='number' />
                    <Input placeholder='Sell Fee (%)' type='number' />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='space-y-4'>
              <Input placeholder='Max Wallet Limit (%)' type='number' />
              <Input placeholder='Max Transaction Limit (%)' type='number' />
              <Input placeholder='Initial Distribution (wallet address:amount)' />
            </div>
          )}

          {step === 4 && (
            <div className='text-center space-y-4'>
              <p>
                You're ready to deploy your token. Estimated gas fee will be
                shown on wallet confirmation.
              </p>
              <Button className='w-full'>Deploy Token</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className='flex justify-between mt-6'>
        <Button variant='outline' onClick={prevStep} disabled={step === 0}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={step === steps.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
}
