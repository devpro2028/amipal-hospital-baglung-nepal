'use client'

import { CreditCard, DollarSign, Users } from 'lucide-react'
import './styles/admin-tailwind.css'
import { Button } from '../admin-ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../admin-ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../admin-ui/tabs'

export function AdminDashboard() {
  return (
    <div className="adm:flex adm:flex-col">
      {/* Top Navbar */}
      <div className="adm:border-b adm:border-border/40">
        <div className="adm:flex adm:h-16 adm:items-center adm:px-4">
          {/* <TeamSwitcher /> */}
          {/* <MainNav className="adm:mx-6" />
          <div className="adm:ml-auto adm:flex adm:items-center adm:space-x-4">
            <SearchInput />
            <Button variant="ghost" size="icon" className="adm:h-8 adm:w-8">
              <Moon className="adm:h-4 adm:w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="adm:h-8 adm:w-8">
              <Settings className="adm:h-4 adm:w-4" />
            </Button>
            <UserNav />
          </div> */}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="adm:flex-1 adm:space-y-4 adm:p-4 md:adm:p-8 adm:pt-6">
        <div className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0">
          <h2 className="adm:text-2xl sm:adm:text-3xl adm:font-bold adm:tracking-tight">
            Dashboard
          </h2>
          <div className="adm:flex adm:items-center adm:space-x-2">
            <Button size="sm" className="sm:adm:hidden">
              Download
            </Button>
            <Button className="adm:hidden sm:adm:inline-flex">Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="adm:space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="adm:space-y-4">
            <div className="adm:flex adm:flex-nowrap adm:gap-4 adm:overflow-x-auto adm:pb-4 adm:-mx-4 adm:px-4 md:adm:mx-0 md:adm:px-0 md:adm:grid md:adm:grid-cols-2 lg:adm:grid-cols-4 md:adm:overflow-visible md:adm:pb-0">
              <Card className="adm:min-w-[250px] md:adm:min-w-0">
                <CardHeader className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0 adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Total Revenue</CardTitle>
                  <DollarSign className="adm:h-4 adm:w-4 adm:text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">$45,231.89</div>
                  <p className="adm:text-xs adm:text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card className="adm:min-w-[250px] md:adm:min-w-0">
                <CardHeader className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0 adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Subscriptions</CardTitle>
                  <Users className="adm:h-4 adm:w-4 adm:text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">+2350</div>
                  <p className="adm:text-xs adm:text-muted-foreground">+180.1% from last month</p>
                </CardContent>
              </Card>
              <Card className="adm:min-w-[250px] md:adm:min-w-0">
                <CardHeader className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0 adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Sales</CardTitle>
                  <CreditCard className="adm:h-4 adm:w-4 adm:text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">+12,234</div>
                  <p className="adm:text-xs adm:text-muted-foreground">+19% from last month</p>
                </CardContent>
              </Card>
              <Card className="adm:min-w-[250px] md:adm:min-w-0">
                <CardHeader className="adm:flex adm:flex-row adm:items-center adm:justify-between adm:space-y-0 adm:pb-2">
                  <CardTitle className="adm:text-sm adm:font-medium">Active Now</CardTitle>
                  {/* <Activity className="adm:h-4 adm:w-4 adm:text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="adm:text-2xl adm:font-bold">+573</div>
                  <p className="adm:text-xs adm:text-muted-foreground">+201 since last hour</p>
                </CardContent>
              </Card>
            </div>

            <div className="adm:flex adm:flex-nowrap adm:gap-4 adm:overflow-x-auto adm:pb-4 adm:-mx-4 adm:px-4 md:adm:mx-0 md:adm:px-0 md:adm:overflow-visible md:adm:pb-0">
              <Card className="adm:min-w-[300px] adm:w-full lg:adm:w-1/2 md:adm:min-w-0">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="adm:pl-2">
                  <div className="adm:flex adm:items-end adm:justify-between adm:h-[350px] adm:pb-4 adm:pt-4 adm:px-2">
                    {[
                      { name: 'Jan', value: 120 },
                      { name: 'Feb', value: 250 },
                      { name: 'Mar', value: 180 },
                      { name: 'Apr', value: 290 },
                      { name: 'May', value: 200 },
                      { name: 'Jun', value: 310 },
                      { name: 'Jul', value: 280 },
                      { name: 'Aug', value: 190 },
                      { name: 'Sep', value: 300 },
                      { name: 'Oct', value: 240 },
                      { name: 'Nov', value: 320 },
                      { name: 'Dec', value: 280 },
                    ].map((data, i) => (
                      <div
                        key={i}
                        className="adm:flex adm:flex-col adm:items-center adm:gap-2 adm:flex-1"
                      >
                        <div
                          className="adm:w-full adm:max-w-[2rem] adm:bg-primary adm:rounded-t-sm"
                          style={{ height: `${data.value}px`, maxHeight: '300px' }}
                        />
                        <span className="adm:text-[10px] sm:adm:text-xs adm:text-muted-foreground adm:hidden sm:adm:block">
                          {data.name}
                        </span>
                        <span className="adm:text-[10px] sm:adm:text-xs adm:text-muted-foreground sm:adm:hidden">
                          {data.name[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="adm:min-w-[300px] adm:w-full lg:adm:w-1/2 md:adm:min-w-0">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>You made 265 sales this month.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="adm:space-y-8">
                    {[
                      {
                        name: 'Olivia Martin',
                        email: 'olivia.martin@email.com',
                        amount: '+$1,999.00',
                      },
                      { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
                      {
                        name: 'Isabella Nguyen',
                        email: 'isabella.nguyen@email.com',
                        amount: '+$299.00',
                      },
                      { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
                      { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
                    ].map((sale, i) => (
                      <div key={i} className="adm:flex adm:items-center">
                        <div className="adm:flex adm:h-9 adm:w-9 adm:items-center adm:justify-center adm:rounded-full adm:bg-muted">
                          <span className="adm:text-sm adm:font-medium">
                            {sale.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </span>
                        </div>
                        <div className="adm:ml-4 adm:space-y-1">
                          <p className="adm:text-sm adm:font-medium adm:leading-none">
                            {sale.name}
                          </p>
                          <p className="adm:text-sm adm:text-muted-foreground">{sale.email}</p>
                        </div>
                        <div className="adm:ml-auto adm:font-medium">{sale.amount}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="adm:space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View detailed analytics and performance metrics.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="adm:flex adm:h-[400px] adm:items-center adm:justify-center adm:rounded-lg adm:border adm:border-dashed">
                  <p className="adm:text-sm adm:text-muted-foreground">
                    Detailed analytics visualizations will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="adm:space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Recent system alerts and messages.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="adm:space-y-4">
                  {[
                    {
                      title: 'System Update Completed',
                      desc: 'The latest system updates have been successfully applied.',
                      time: '1h ago',
                    },
                    {
                      title: 'New User Registration',
                      desc: '5 new users registered in the last 24 hours.',
                      time: '3h ago',
                    },
                    {
                      title: 'Database Backup',
                      desc: 'Weekly database backup completed successfully.',
                      time: '1d ago',
                    },
                  ].map((notification, i) => (
                    <div
                      key={i}
                      className="adm:flex adm:items-start adm:gap-4 adm:rounded-lg adm:border adm:p-4"
                    >
                      <div className="adm:mt-1 adm:h-2 adm:w-2 adm:rounded-full adm:bg-primary" />
                      <div>
                        <p className="adm:text-sm adm:font-medium">{notification.title}</p>
                        <p className="adm:text-sm adm:text-muted-foreground">{notification.desc}</p>
                      </div>
                      <div className="adm:ml-auto adm:text-xs adm:text-muted-foreground whitespace-nowrap">
                        {notification.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
