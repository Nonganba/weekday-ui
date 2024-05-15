import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, Chip, Container } from "@mui/material";

export default function JobCard({ job }) {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 345,
        padding: "20px",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
        borderRadius: "20px",
      }}
    >
      <Chip label="⌛Posted 10 days ago" variant="outlined" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "15px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <CardMedia
            component="img"
            image={job.logoUrl}
            alt="company_logo"
            sx={{ height: "50px", width: "35px", objectFit: "fill" }}
          />

          <Box>
            <Typography variant="body2" color="text.secondary">
              {job.companyName}
            </Typography>
            <Typography variant="body1" color="text.primary" sx={{ fontSize: '17px'}}>
              {job.jobRole.charAt(0).toUpperCase() + job.jobRole.slice(1)}
            </Typography>
            <Typography variant="body5" color="text.primary" sx={{ fontWeight: '600', fontSize: '14px'}}>
              {job.location.charAt(0).toUpperCase() + job.location.slice(1)}
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '600'}}>
            Estimated Salary: &#36;{job.minJdSalary}
            {job.minJdSalary && job.maxJdSalary && " - "}
            {job.maxJdSalary} {job.salaryCurrencyCode}✅
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          marginTop: "10px",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "600", fontSize: "15px" }}
        >
          About Company :
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "700" }}>
          About Us :
        </Typography>
        <Typography variant="body2">
          {job.jobDetailsFromCompany}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Button
            style={{ textTransform: "none" }}
          >
            View more
          </Button>
        </Container>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3px",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Minimum Experience
          </Typography>
          <Typography variant="body2">
            {job.minExp ?? 0} years
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "#54EFC3",
              textTransform: "none",
              color: "black",
              fontWeight: "600",
              display: "block",
              width: "100%",
            }}
            color="success"
          >
            ⚡Easy Apply
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "#4943DA",
              textTransform: "none",
              color: "white",
            }}
          >
            Unlock referral asks
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
