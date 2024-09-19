import { StyleSheet } from "react-native";

const containerBackgroundColor = "rgba(0, 0, 0, 0.5)";
const playButtonBorderColor = "rgba(255,255,255,0.5)";
const white = "#fff";

export default StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: containerBackgroundColor,
    bottom: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    left: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    position: "absolute",
    right: 0,
    top: 0,
  },
  controlsRow: {
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
    justifyContent: "center",
  },
  fullScreenContainer: {
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 20,
  },
  playButton: {
    alignItems: "center",
    borderColor: playButtonBorderColor,
    borderRadius: 3,
    borderWidth: 1.5,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  playIcon: {
    height: 22,
    resizeMode: "contain",
    width: 22,
    
  },
  progressColumnContainer: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: -25,
  },
  progressSlider: {
    alignSelf: "stretch",
  },
  replayIcon: {
    height: 10,
    resizeMode: "stretch",
    width: 10,
  },
  thumb: {
    backgroundColor: 'red',
    borderRadius: 30,
    borderWidth: 3,
    height: 15,
    width: 15,
  },
  timeRow: {
    alignSelf: "stretch",
  },
  timerLabel: {
    color: white,
    fontSize: 12,
  },
  timerLabelsContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -7,
  },
  toolbar: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
  },
  toolbarRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  track: {
    borderRadius: 1,
    height: 2,
  },
});
