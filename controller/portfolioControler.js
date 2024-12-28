
const PortfolioBasicInfo = require("../models/PortfolioBasicInfo");
const Route = require("../models/Route");


    exports.checkAvailability = async (req, res) => {
        const { route } = req.query; 
      console.log(route)
        if (!route) {
          return res.status(400).json({ message: "route is required" });
        }
      
        try {
          const routeAvailable = await Route.findOne({ route }); // Check if the route exists for a user(means not present in database)
          if (!routeAvailable) {
            return res.status(200).json({ available: true }); 
          }
          return res.status(200).json({ available: false }); 
        } catch (error) {
          return res.status(500).json({ message: "Server error", error });
        }}




      exports.createPortfolio = async (req, res) => {
          const { portfolioURL, fullName, title, tagline, description, email, skills, phone, linkedin, github, youtube,userId } =
            req.body;
        
          // Validate required fields
          if (!portfolioURL || !fullName || !title || !description || !email) {
            return res.status(400).json({
              success: false,
              message: 'Required fields are missing: portfolioURL, fullName, title, description, email',
            });
          }
        
          try {
        
            // Create new portfolio
            const newPortfolio = new PortfolioBasicInfo({
              portfolioURL,
              fullName,
              title,
              tagline,
              description,
              email,
              skills,
              phone,
              linkedin,
              github,
              youtube,
              userId
            });
        
            await newPortfolio.save();

              // Save the route of portfolio in route model
        const routeEntry = new Route({ route: portfolioURL, userId }); // Assuming portfolioURL is the route
        await routeEntry.save(); 

            res.status(200).json({
              success: true,
              message: 'Portfolio created successfully',
              data: newPortfolio,
            });
          } catch (error) {
            console.error('Error creating portfolio:', error);
            res.status(500).json({
              success: false,
              message: 'An error occurred while creating the portfolio',
            });
          }
        };


        exports.hasPortfolio = async (req, res) => {
          const { userId } = req.query;
          console.log(userId)
          try {
            const portfolio = await PortfolioBasicInfo.findOne({ userId });
            if (!portfolio) {
              return res.status(200).json({ hasPortfolio: false });
            }
            return res.status(200).json({ hasPortfolio: true,portfolioURL:portfolio.portfolioURL });
          } catch (error) {
            console.error('Error checking if user has portfolio:', error);
            return res.status(500).json({ message: 'An error occurred while checking if user has portfolio' });
          }
        }

        exports.portfolioIntroData = async (req, res) => {
          try {
              const { route } = req.query; // Assuming you want to get data based on route
              console.log(route)
              if (!route) {
                  return res.status(400).json({ message: "route is required" });
              }
      
              const portfolioData = await PortfolioBasicInfo.findOne({ portfolioURL:route }); // Fetch portfolio data for the user
              if (!portfolioData) {
                  return res.status(404).json({ message: "Portfolio not found" });
              }
      
              return res.status(200).json({ success: true, portfolioIntroData:portfolioData });
          } catch (error) {
              console.error('Error fetching portfolio intro data:', error);
              return res.status(500).json({ message: 'Server error', error });
          }
      };


        exports.deletePortfolio = async (req, res) => {
          const { userId } = req.query;

          if (!userId) {
            console.log('userId',userId)
            return res.status(400).json({ message: "userId is required" });

          }

          try {
            const portfolio = await PortfolioBasicInfo.findOneAndDelete({ userId });

            if (!portfolio) {
              return res.status(404).json({ message: "Portfolio not found" });
            }

            await Route.findOneAndDelete({ userId });

            return res.status(200).json({ success: true, message: "Portfolio deleted successfully" });
          } catch (error) {
            console.error('Error deleting portfolio:', error);
            return res.status(500).json({ message: "Server error", error });
          }
        };
       