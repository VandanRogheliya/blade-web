import Header from "@/components/common/header";
import WaitlistFooter from "@/components/common/waitlist-footer";
import TransactionParserDemo from "@/components/transaction-parser/transaction-parser-demo";

export default function TransactionParser() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <TransactionParserDemo />
      <div className="flex-1" />
      <WaitlistFooter />
    </div>
  );
}
