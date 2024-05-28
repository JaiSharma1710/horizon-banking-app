import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";

const Home = () => {
  const loggedIn = {
    $id: "id",
    email: "jai@test.com",
    userId: "12345",
    dwollaCustomerUrl: "test",
    dwollaCustomerId: "test",
    firstName: "jai",
    lastName: "sharma",
    address1: "BH-16",
    city: "meerut",
    state: "up",
    postalCode: "250110",
    dateOfBirth: "17/10/1999",
    ssn: "string",
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250000.35}
          />
        </header>
        RECENT TRANSACTION
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.5 }, { currentBalance: 1583.47 }]}
      />
    </section>
  );
};

export default Home;
