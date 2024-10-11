# FIT3179 A2 - Animal Rescue Statistics Visualization

This project visualizes animal rescue statistics in Victoria, with interactive graphs and a proportional symbol map. The data visualized includes rescue counts for municipalities, euthanasia rates over time, and a comparison of dog ownership costs between adoption and purchasing.

## Repository Overview

- **Repository Name**: `riwpink8.github.io`
- **Project**: Visualizing animal rescue statistics in Victoria
- **Language**: HTML, CSS, JavaScript (using Vega-Lite for data visualization)
- **Data Files**: CSV files are used to store data for visualization.
- **Dependencies**: Vega, Vega-Lite, Vega-Embed for interactive charts

## Getting Started

### Prerequisites

You need to have Python installed on your machine to run the local development server. This project uses a basic HTTP server to serve the static HTML files.

### How to Run the Project Locally

Follow these steps to set up the project and start a local development server:

1. **Clone the Repository**:
   
   If you haven't cloned the repository yet, clone it using the following command:

   ```bash
   git clone https://github.com/riwpink8/riwpink8.github.io.git
   ```

2. **Navigate to the Project Directory**:
   
   Once cloned, navigate to the project directory:

   ```bash
   cd riwpink8.github.io
   ```

3. **Start the Python HTTP Server**:
   
   Start a local Python server to view the website locally:

   - For Python 3.x:

     ```bash
     python3 -m http.server 8000
     ```

   - For Python 2.x:

     ```bash
     python -m SimpleHTTPServer 8000
     ```

4. **View the Site**:
   
   Open your web browser and go to:

   ```
   http://localhost:8000
   ```

   This will load the website on your local machine, and you can interact with the visualizations.

## Project Structure

```
/riwpink8.github.io/
│
├── /data/                # Folder containing the CSV data files
├── index.html            # Main HTML file for the project
├── styles.css            # CSS for styling the website
└── README.md             # This readme file
```

### CSV Data Files:

- **Dog_Ownership_Costs.csv**: Contains data comparing adoption and purchasing costs for dog ownership.
- **Euthanasia_Rates.csv**: Contains euthanasia rates over several years.
- **Graph_Data.csv**: Contains animal rescue data by municipality, latitude, longitude, and the number of animals rescued.

### Data Visualizations:

1. **Cost Comparison Between Adoption and Purchasing**: 
   - Diverging bar chart comparing the costs of adopting vs. purchasing a dog.
2. **Euthanasia Rates Over Time**: 
   - A dual-axis line graph showing the number of euthanized animals and the percentage over time.
3. **Total Animals Rescued by Municipality**: 
   - Proportional symbol map showing the total number of animals rescued by municipality in Victoria.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the [issues page](https://github.com/riwpink8/riwpink8.github.io/issues) if you'd like to contribute.
```

### Breakdown of `README.md`:
1. **Getting Started**: This includes instructions for cloning the repository and starting a simple Python HTTP server for local development.
2. **Project Structure**: This outlines the main components and directories in your project.
3. **Data Files**: Describes the CSV data files used in the project.
4. **Visualizations**: Explains the types of charts and visualizations provided.
5. **License & Contributions**: Provides information on licensing and how to contribute to the project.

### Next Steps:
1. Save this text to a file named `README.md` in your repository.
2. Push the updated repository to GitHub:

   ```bash
   git add README.md
   git commit -m "Add project README"
   git push origin main
   ```

This README should guide users through running and understanding the project. Let me know if you'd like to tweak any details!