"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { getPlanLimits } from "@/lib/plans";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

export const PricingSection = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useUser();

  const plans = [
    {
      id: "STARTER",
      ...getPlanLimits("STARTER"),
      popular: false,
    },
    {
      id: "GROWTH",
      ...getPlanLimits("GROWTH"),
      popular: true,
    },
    {
      id: "PRO",
      ...getPlanLimits("PRO"),
      popular: false,
    },
  ];

  const handlePlanSelect = async (planId: string) => {
    console.log("Plan selected:", planId);
    console.log("User:", user);

    if (planId === "STARTER") {
      // Free trial - redirect to sign up
      router.push("/auth/sign-up");
      return;
    }

    if (!user) {
      // User needs to sign in first
      router.push("/auth/sign-in");
      return;
    }

    // Payment functionality is currently disabled
    toast.info(
      "Payment functionality is currently disabled. Please contact support for plan upgrades."
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Perfect Plan
        </h2>
        <p className="text-xl text-gray-600">
          Start with our free trial or upgrade to unlock advanced features
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative transition-all duration-300 hover:shadow-lg ${
              plan.popular ? "ring-2 ring-blue-500 scale-105" : ""
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                Most Popular
              </Badge>
            )}

            <CardHeader>
              <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
              <CardDescription className="text-3xl font-bold text-gray-900">
                {plan.price}
                {plan.id !== "STARTER" && (
                  <span className="text-lg font-normal text-gray-600">
                    /month
                  </span>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Credits Overview */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">AI Conversations</span>
                  <span className="font-bold">{plan.aiCredits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Email Campaigns</span>
                  <span className="font-bold">{plan.emailCredits}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">What&apos;s included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : plan.id === "STARTER"
                    ? "bg-gray-900 hover:bg-gray-800"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
                onClick={() => handlePlanSelect(plan.id)}
                disabled={loading === plan.id}
              >
                {loading === plan.id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                    Processing...
                  </>
                ) : plan.id === "STARTER" ? (
                  "Start Free Trial"
                ) : (
                  `Get ${plan.name}`
                )}
              </Button>

              {plan.id === "STARTER" && (
                <p className="text-xs text-gray-500 text-center">
                  No credit card required
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* FAQ or additional info */}
      <div className="mt-16 text-center">
        <p className="text-gray-600">
          All plans include unlimited human chat support, real-time messaging,
          and comprehensive analytics.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Need a custom solution?{" "}
          <a
            href="mailto:support@weezgen.com"
            className="text-blue-600 hover:underline"
          >
            Contact us
          </a>
        </p>
      </div>
    </div>
  );
};
