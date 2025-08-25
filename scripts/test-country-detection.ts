import {
  detectCountryFromIP,
  findCountryByCode,
  findCountryByDialCode,
} from "@/lib/countryCodes";

async function testCountryDetection() {
  console.log("🧪 Testing Country Detection Functionality...\n");

  try {
    // Test 1: IP-based country detection
    console.log("1. Testing IP-based country detection...");
    const detectedCountry = await detectCountryFromIP();

    if (detectedCountry) {
      console.log(
        `✅ Detected country: ${detectedCountry.name} (${detectedCountry.code})`
      );
      console.log(`   Dial code: ${detectedCountry.dialCode}`);
      console.log(`   Flag: ${detectedCountry.flag}\n`);
    } else {
      console.log("❌ Failed to detect country from IP\n");
    }

    // Test 2: Find country by ISO code
    console.log("2. Testing country lookup by ISO code...");
    const usCountry = findCountryByCode("US");
    const gbCountry = findCountryByCode("GB");

    if (usCountry) {
      console.log(`✅ Found US: ${usCountry.name} (${usCountry.dialCode})`);
    }
    if (gbCountry) {
      console.log(`✅ Found GB: ${gbCountry.name} (${gbCountry.dialCode})`);
    }
    console.log("");

    // Test 3: Find country by dial code
    console.log("3. Testing country lookup by dial code...");
    const plusOneCountry = findCountryByDialCode("+1");
    const plus44Country = findCountryByDialCode("+44");

    if (plusOneCountry) {
      console.log(
        `✅ Found +1: ${plusOneCountry.name} (${plusOneCountry.code})`
      );
    }
    if (plus44Country) {
      console.log(
        `✅ Found +44: ${plus44Country.name} (${plus44Country.code})`
      );
    }
    console.log("");

    // Test 4: Test invalid codes
    console.log("4. Testing invalid country codes...");
    const invalidCountry = findCountryByCode("XX");
    if (!invalidCountry) {
      console.log("✅ Correctly returned undefined for invalid country code");
    } else {
      console.log("❌ Should have returned undefined for invalid country code");
    }
    console.log("");

    console.log("🎉 All tests completed!");
  } catch (error) {
    console.error("❌ Error during testing:", error);
  }
}

// Run the test
testCountryDetection();
