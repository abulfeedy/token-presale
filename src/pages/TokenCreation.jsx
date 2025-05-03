import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label"; // Added Label import
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const steps = [
  "Network",
  "Token Info",
  "Token Features",
  "Advanced Settings",
  "Overview",
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

export default function CreateToken() {
  const [currentStep, setCurrentStep] = useState(0);
  const [network, setNetwork] = useState("bsc"); // Added state for network
  const [tokenInfo, setTokenInfo] = useState({
    name: "",
    symbol: "",
    decimals: 18,
    totalSupply: "",
    logo: null,
    description: "",
  });
  const [tokenFeatures, setTokenFeatures] = useState({
    deflationary: { enabled: false, tax: "" },
    reflection: { enabled: false, percentage: "" },
    mintable: { enabled: false },
    burnable: { enabled: false },
    pausable: { enabled: false },
    supplyLock: { enabled: false },
    antiWhale: { enabled: false, maxWalletSize: "" },
    customFees: { enabled: false, buyFee: "", sellFee: "" },
  });
  const [advancedSettings, setAdvancedSettings] = useState({
    enableTrading: true,
    initialDistribution: "",
    maxTransactionLimit: "",
    maxWalletLimit: "",
    blacklist: "",
    tradingStartDelay: "",
  });
  const [supplyData, setSupplyData] = useState([
    { name: "Private Sale", value: 30 },
    { name: "Liquidity", value: 50 },
    { name: "Team", value: 20 },
  ]);
  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors = {};
    if (currentStep === 0) {
      if (!network) newErrors.network = "Please select a network.";
    } else if (currentStep === 1) {
      if (!tokenInfo.name) newErrors.name = "Token name is required.";
      if (!tokenInfo.symbol) newErrors.symbol = "Symbol is required.";
      if (!tokenInfo.totalSupply)
        newErrors.totalSupply = "Total supply is required.";
      if (
        isNaN(Number(tokenInfo.totalSupply)) ||
        Number(tokenInfo.totalSupply) <= 0
      )
        newErrors.totalSupply = "Total supply must be a positive number.";
      if (tokenInfo.decimals < 0 || tokenInfo.decimals > 18)
        newErrors.decimals = "Decimals must be between 0 and 18.";
    } else if (currentStep === 3) {
      const totalSupply = supplyData.reduce((sum, item) => sum + item.value, 0);
      if (totalSupply !== 100)
        newErrors.supplyData = "Tokenomics distribution must sum to 100%.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const toggleFeature = (feature) => {
    setTokenFeatures((prev) => ({
      ...prev,
      [feature]: {
        ...prev[feature],
        enabled: !prev[feature].enabled,
      },
    }));
  };

  const updateFeatureConfig = (feature, field, value) => {
    setTokenFeatures((prev) => ({
      ...prev,
      [feature]: {
        ...prev[feature],
        [field]: value,
      },
    }));
  };

  const uploadLogo = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          logo: "Only PNG, JPEG, or GIF images are allowed.",
        }));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          logo: "Image size must be less than 2MB.",
        }));
        return;
      }
      setErrors((prev) => ({ ...prev, logo: undefined }));
      setTokenInfo({ ...tokenInfo, logo: URL.createObjectURL(file) });
    }
  };

  const handleSupplyChange = (index, value) => {
    const newValue = Number(value);
    if (isNaN(newValue) || newValue < 0) return;
    setSupplyData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value: newValue } : item))
    );
  };

  const handleDeploy = () => {
    console.log({
      network,
      tokenInfo,
      tokenFeatures,
      advancedSettings,
      supplyData,
    });
    alert("Token deployment initiated!");
  };

  return (
    <div className='max-w-5xl mt-10 mx-auto p-4'>
      <Progress
        value={(currentStep / (steps.length - 1)) * 100}
        className='mb-6'
      />
      <div className='flex justify-between mb-6'>
        {steps.map((step, index) => (
          <div key={index} className='flex-1 text-center'>
            <div
              className={`w-8 h-8 rounded-full flex items-center text-sm sm:text-base justify-center mx-auto mb-2 ${
                index <= currentStep ? "bg-primary text-white" : "bg-gray-300"
              }`}>
              {index + 1}
            </div>

            <span
              className={`${
                index <= currentStep ? "font-semibold" : "text-gray-400"
              }`}>
              {step}
            </span>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className='p-6'>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}>
            {currentStep === 0 && (
              <div className='space-y-4'>
                <Label className='block text-sm font-medium'>
                  Select Network
                </Label>
                <Tabs value={network} onValueChange={setNetwork}>
                  <TabsList className='grid grid-cols-4 text-sm sm:text-base'>
                    <TabsTrigger value='bsc'>BNB Chain</TabsTrigger>
                    <TabsTrigger value='eth'>Ethereum</TabsTrigger>
                    <TabsTrigger value='solana'>Solana</TabsTrigger>
                    <TabsTrigger value='base'>Base</TabsTrigger>
                  </TabsList>
                </Tabs>
                {errors.network && (
                  <p className='text-red-500 text-sm'>{errors.network}</p>
                )}
              </div>
            )}

            {currentStep === 1 && (
              <div className='space-y-4'>
                <div>
                  <Label htmlFor='token-name' className='block mb-1'>
                    Token Name
                  </Label>
                  <Input
                    id='token-name'
                    placeholder='Token Name'
                    value={tokenInfo.name}
                    onChange={(e) =>
                      setTokenInfo({ ...tokenInfo, name: e.target.value })
                    }
                  />
                  {errors.name && (
                    <p className='text-red-500 text-sm'>{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor='token-symbol' className='block mb-1'>
                    Token Symbol
                  </Label>
                  <Input
                    id='token-symbol'
                    placeholder='Token Symbol'
                    value={tokenInfo.symbol}
                    onChange={(e) =>
                      setTokenInfo({ ...tokenInfo, symbol: e.target.value })
                    }
                  />
                  {errors.symbol && (
                    <p className='text-red-500 text-sm'>{errors.symbol}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor='decimals' className='block mb-1'>
                    Decimals (0-18)
                  </Label>
                  <Input
                    id='decimals'
                    type='number'
                    placeholder='Decimals (Default: 18)'
                    value={tokenInfo.decimals}
                    onChange={(e) =>
                      setTokenInfo({
                        ...tokenInfo,
                        decimals: parseInt(e.target.value) || 0,
                      })
                    }
                    min='0'
                    max='18'
                  />
                  {errors.decimals && (
                    <p className='text-red-500 text-sm'>{errors.decimals}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor='total-supply' className='block mb-1'>
                    Total Supply
                  </Label>
                  <Input
                    id='total-supply'
                    type='number'
                    placeholder='Total Supply'
                    value={tokenInfo.totalSupply}
                    onChange={(e) =>
                      setTokenInfo({
                        ...tokenInfo,
                        totalSupply: e.target.value,
                      })
                    }
                    min='0'
                  />
                  {errors.totalSupply && (
                    <p className='text-red-500 text-sm'>{errors.totalSupply}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor='logo-upload' className='block mb-1'>
                    Upload Token Logo
                  </Label>
                  <Input
                    id='logo-upload'
                    type='file'
                    accept='image/png,image/jpeg,image/gif'
                    onChange={uploadLogo}
                  />
                  {errors.logo && (
                    <p className='text-red-500 text-sm'>{errors.logo}</p>
                  )}
                  {tokenInfo.logo && (
                    <img
                      src={tokenInfo.logo}
                      alt='Logo preview'
                      className='mt-2 w-20 h-20 object-cover rounded-full'
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor='description' className='block mb-1'>
                    Short Token Description
                  </Label>
                  <Textarea
                    id='description'
                    placeholder='Short Token Description'
                    value={tokenInfo.description}
                    onChange={(e) =>
                      setTokenInfo({
                        ...tokenInfo,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className='space-y-6'>
                <div className='grid grid-cols-2 gap-4'>
                  {Object.keys(tokenFeatures).map((feature) => (
                    <div key={feature} className='flex items-center space-x-2'>
                      <Checkbox
                        id={feature}
                        checked={tokenFeatures[feature].enabled}
                        onCheckedChange={() => toggleFeature(feature)}
                      />
                      <Label htmlFor={feature} className='capitalize'>
                        {feature.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className='space-y-4'>
                  {tokenFeatures.deflationary.enabled && (
                    <div>
                      <Label htmlFor='deflationary-tax'>
                        Deflationary Tax (%)
                      </Label>
                      <Input
                        id='deflationary-tax'
                        placeholder='Deflationary Tax (%)'
                        type='number'
                        value={tokenFeatures.deflationary.tax}
                        onChange={(e) =>
                          updateFeatureConfig(
                            "deflationary",
                            "tax",
                            e.target.value
                          )
                        }
                        min='0'
                        max='100'
                      />
                    </div>
                  )}
                  {tokenFeatures.reflection.enabled && (
                    <div>
                      <Label htmlFor='reflection-percentage'>
                        Reflection Percentage (%)
                      </Label>
                      <Input
                        id='reflection-percentage'
                        placeholder='Reflection Percentage (%)'
                        type='number'
                        value={tokenFeatures.reflection.percentage}
                        onChange={(e) =>
                          updateFeatureConfig(
                            "reflection",
                            "percentage",
                            e.target.value
                          )
                        }
                        min='0'
                        max='100'
                      />
                    </div>
                  )}
                  {tokenFeatures.antiWhale.enabled && (
                    <div>
                      <Label htmlFor='max-wallet-size'>
                        Max Wallet Size (%)
                      </Label>
                      <Input
                        id='max-wallet-size'
                        placeholder='Max Wallet Size (%)'
                        type='number'
                        value={tokenFeatures.antiWhale.maxWalletSize}
                        onChange={(e) =>
                          updateFeatureConfig(
                            "antiWhale",
                            "maxWalletSize",
                            e.target.value
                          )
                        }
                        min='0'
                        max='100'
                      />
                    </div>
                  )}
                  {tokenFeatures.customFees.enabled && (
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <Label htmlFor='buy-fee'>Buy Fee (%)</Label>
                        <Input
                          id='buy-fee'
                          placeholder='Buy Fee (%)'
                          type='number'
                          value={tokenFeatures.customFees.buyFee}
                          onChange={(e) =>
                            updateFeatureConfig(
                              "customFees",
                              "buyFee",
                              e.target.value
                            )
                          }
                          min='0'
                          max='100'
                        />
                      </div>
                      <div>
                        <Label htmlFor='sell-fee'>Sell Fee (%)</Label>
                        <Input
                          id='sell-fee'
                          placeholder='Sell Fee (%)'
                          type='number'
                          value={tokenFeatures.customFees.sellFee}
                          onChange={(e) =>
                            updateFeatureConfig(
                              "customFees",
                              "sellFee",
                              e.target.value
                            )
                          }
                          min='0'
                          max='100'
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className='space-y-4'>
                <div className='flex flex-col space-y-2'>
                  <Label>Enable Trading After Launch</Label>
                  <Tabs
                    defaultValue={advancedSettings.enableTrading ? "yes" : "no"}
                    onValueChange={(value) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        enableTrading: value === "yes",
                      })
                    }>
                    <TabsList>
                      <TabsTrigger value='yes'>Yes</TabsTrigger>
                      <TabsTrigger value='no'>No</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div>
                  <Label htmlFor='initial-distribution'>
                    Initial Token Distribution Details
                  </Label>
                  <Input
                    id='initial-distribution'
                    placeholder='Initial Token Distribution Details'
                    value={advancedSettings.initialDistribution}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        initialDistribution: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor='max-transaction-limit'>
                    Max Transaction Limit
                  </Label>
                  <Input
                    id='max-transaction-limit'
                    type='number'
                    placeholder='Max Transaction Limit'
                    value={advancedSettings.maxTransactionLimit}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        maxTransactionLimit: e.target.value,
                      })
                    }
                    min='0'
                  />
                </div>
                <div>
                  <Label htmlFor='max-wallet-limit'>Max Wallet Limit</Label>
                  <Input
                    id='max-wallet-limit'
                    type='number'
                    placeholder='Max Wallet Limit'
                    value={advancedSettings.maxWalletLimit}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        maxWalletLimit: e.target.value,
                      })
                    }
                    min='0'
                  />
                </div>
                <div>
                  <Label htmlFor='blacklist'>
                    Blacklist Functionality (Addresses separated by commas)
                  </Label>
                  <Input
                    id='blacklist'
                    placeholder='Blacklist Functionality (Addresses separated by commas)'
                    value={advancedSettings.blacklist}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        blacklist: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor='trading-start-delay'>
                    Trading Start Delay (Blocks)
                  </Label>
                  <Input
                    id='trading-start-delay'
                    type='number'
                    placeholder='Trading Start Delay (Blocks)'
                    value={advancedSettings.tradingStartDelay}
                    onChange={(e) =>
                      setAdvancedSettings({
                        ...advancedSettings,
                        tradingStartDelay: e.target.value,
                      })
                    }
                    min='0'
                  />
                </div>
                <div className='space-y-2'>
                  <h3 className='font-semibold'>Tokenomics Distribution</h3>
                  {supplyData.map((item, index) => (
                    <div
                      key={item.name}
                      className='flex items-center space-x-2'>
                      <Label className='w-32'>{item.name}</Label>
                      <Input
                        type='number'
                        value={item.value}
                        onChange={(e) =>
                          handleSupplyChange(index, e.target.value)
                        }
                        min='0'
                      />
                    </div>
                  ))}
                  {errors.supplyData && (
                    <p className='text-red-500 text-sm'>{errors.supplyData}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h2 className='font-medium mb-4'>Token Overview</h2>
                  <div className='gap-4 text-sm divide-y divide-gray-100'>
                    <div className='flex justify-between items-center py-2'>
                      <p className='text-gray-600'>Network</p>{" "}
                      <p>
                        {network === "bsc"
                          ? "BNB Chain"
                          : network === "eth"
                          ? "Ethereum"
                          : "Solana"}
                      </p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                      <p className='text-gray-600'>Name</p>{" "}
                      <p>{tokenInfo.name}</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                      <p className='text-gray-600'>Symbol</p>{" "}
                      <p>{tokenInfo.symbol}</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                      <p className='text-gray-600'>Total Supply</p>{" "}
                      <p>{tokenInfo.totalSupply}</p>
                    </div>
                    <div className='flex justify-between items-center py-2'>
                      <p className='text-gray-600'>Features</p>{" "}
                      <p>
                        {Object.keys(tokenFeatures)
                          .filter((f) => tokenFeatures[f].enabled)
                          .map((f) => f.replace(/([A-Z])/g, " $1").trim())
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className='font-medium mb-4 text-center'>
                    Tokenomics Overview
                  </h2>
                  <ResponsiveContainer width='100%' height={250}>
                    <PieChart>
                      <Pie
                        dataKey='value'
                        data={supplyData}
                        cx='50%'
                        cy='50%'
                        outerRadius={80}
                        label>
                        {supplyData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </motion.div>

          <div className='flex justify-between mt-6'>
            {currentStep > 0 && (
              <Button onClick={handleBack} variant='outline'>
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleDeploy}>Deploy Token</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
