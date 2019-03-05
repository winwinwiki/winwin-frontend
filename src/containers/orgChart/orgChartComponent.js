import $ from "jquery";
import "orgchart/dist/css/jquery.orgchart.min.css";
require("orgchart");
export class OrgChartComponent {
  constructor(orgData, visibleLevel, orgDetailPage, addNewChild) {
    this.orgData = orgData;
    this.visibleLevel = visibleLevel;
    this.orgDetailPage = orgDetailPage;
    this.addNewChild = addNewChild;
  }

  renderOrgChart() {
    const _self = this;
    let orgContainerwidth = $("#orgChart").width();
    let matrixX =
      ((this.orgData.children.length + 1) * 250 - orgContainerwidth) / 2;
    let options = {
      data: this.orgData,
      direction: "t2b",
      toggleSiblingsResp: false,
      zoom: true,
      pan: true,
      zoomoutLimit: 0.2,
      zoominLimit: 8,
      visibleLevel: this.visibleLevel,
      nodeTemplate: node => {
        if (node.id.toString().indexOf("_add") > -1) {
          return `<div class="title p-2"></div><div class="content"><p class="text-center">${
            node.name
          }</p></div>`;
        }
        return `<div class="title p-2">${node.name}</div>
                    <div class="content">
                        <div class="row m-0">
                            <div class="col-sm-24 px-2">${node.location}</div>
                        </div>
                        <div class="row m-0">
                            <div class="col-sm-12 px-2">${
                              node.children ? node.children.length - 1 : 0
                            } ${node.childrenType}s</div>
                            ${
                              node.relationship !== "001"
                                ? `<div class="col-sm-12 px-2 text-right viewOrgDetails"><a href="javascript:;">View Details</a></div>`
                                : ""
                            }
                        </div>
                    </div>
                </div>`;
      }
    };
    var oc = $("#orgChart").orgchart(options);
    $("#orgChart .orgchart").css(
      "transform",
      "matrix(1, 0, 0, 1,-" + matrixX + " ,0)"
    );
    $("#orgChart .orgchart .node").click(e => {
      let orgNode = $(e.target).closest(".node");
      let nodeId = $(e.target)
        .closest(".node")
        .attr("id");
      if (
        nodeId.toString().indexOf("_add") === -1 &&
        nodeId !== _self.orgData.id
      ) {
        if (orgNode.attr("class").indexOf("collapsedChildren") > -1) {
          oc.showChildren(orgNode);
          oc.hideSiblings(orgNode);
          orgNode.removeClass("collapsedChildren");
        } else {
          oc.hideChildren(orgNode);
          oc.showSiblings(orgNode);
          orgNode.addClass("collapsedChildren");
        }
      } else if (nodeId.toString().indexOf("_add") > -1) {
        this.addNewChild(
          orgNode.attr("data-parent"),
          nodeId.toString().replace(/(.)*_add/gi, "")
        );
      }
      $("#orgChart .orgchart").css(
        "transform",
        "matrix(1, 0, 0, 1, 0 ,0) scale(1,1)"
      );
    });
    $("#orgChart .orgchart .node .viewOrgDetails").click(e => {
      let nodeId = $(e.target)
        .closest(".node")
        .attr("id");
      _self.orgDetailPage(nodeId);
    });
  }
}
